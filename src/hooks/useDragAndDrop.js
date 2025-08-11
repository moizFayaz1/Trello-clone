// src/hooks/useDragAndDrop.js
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateBoard } from "@/features/boards/boardSlice";
import { db } from "@/config/db";

export const useDragAndDrop = (currentBoard) => {
  const dispatch = useDispatch();

  const onDragEnd = useCallback(
    async (result) => {
      const { destination, source, draggableId, type } = result;

      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      ) {
        return;
      }

      // ========= LIST REORDER =========
      if (type === "list") {
        const newLists = Array.from(currentBoard.lists);
        const [reorderedList] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, reorderedList);

        const updatedLists = newLists.map((list, index) => ({
          ...list,
          position: index + 1,
        }));

        // ✅ Optimistic Redux update
        dispatch(
          updateBoard({
            id: currentBoard.id,
            updates: { lists: updatedLists },
          })
        );

        // DB update in background
        try {
          await Promise.all(
            updatedLists.map((list) =>
              db.lists.update(list.id, { position: list.position })
            )
          );
        } catch (error) {
          console.error("Failed to update list positions:", error);
        }
        return;
      }

      // ========= CARD MOVE =========
      const sourceListId = source.droppableId;
      const destListId = destination.droppableId;

      const sourceCards =
        currentBoard.lists.find((list) => list.id === sourceListId)?.cards ||
        [];

      const destCards =
        sourceListId === destListId
          ? sourceCards
          : currentBoard.lists.find((list) => list.id === destListId)?.cards ||
            [];

      // Moving within the same list

      if (sourceListId === destListId) {
        const newCards = Array.from(sourceCards);
        const [movedCard] = newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, movedCard);
        // console.log(newCards)

        const updatedLists = currentBoard.lists.map((list) => {
          if (list.id === sourceListId) {
            return {
              ...list,
              cards: newCards.map((card, index) => ({
                ...card,
                position: index + 1,
              })),
            };
          }
          return list;
        });

        // ✅ Optimistic Redux update
        dispatch(
          updateBoard({
            id: currentBoard.id,
            updates: { lists: updatedLists },
          })
        );

        // DB update in background
        try {
          await Promise.all(
            newCards.map((card, index) =>
              db.cards.update(card.id, { position: index + 1 })
            )
          );
        } catch (error) {
          console.error("Failed to update card positions:", error);
        }
        return;
      }

      // Moving between lists
      const newSourceCards = Array.from(sourceCards);
      const [movedCard] = newSourceCards.splice(source.index, 1);

      const newDestCards = Array.from(destCards);
      newDestCards.splice(destination.index, 0, {
        ...movedCard,
        list_id: destListId,
      });

      const updatedLists = currentBoard.lists.map((list) => {
        if (list.id === sourceListId) {
          return {
            ...list,
            cards: newSourceCards.map((card, index) => ({
              ...card,
              position: index + 1,
            })),
          };
        }
        if (list.id === destListId) {
          return {
            ...list,
            cards: newDestCards.map((card, index) => ({
              ...card,
              position: index + 1,
            })),
          };
        }
        return list;
      });

      // ✅ Optimistic Redux update
      dispatch(
        updateBoard({
          id: currentBoard.id,
          updates: { lists: updatedLists },
        })
      );

      const updatePositions = (cards) =>
        Promise.all(
          cards.map((card, i) => db.cards.update(card.id, { position: i + 1 }))
        );

      try {
        await db.cards.update(Number(draggableId), {
          list_id: destListId,
          position: destination.index + 1,
        });

        await Promise.all([
          updatePositions(newSourceCards),
          updatePositions(newDestCards),
        ]);
      } catch (err) {
        console.error("DB update failed:", err);
      }
    },
    [currentBoard, dispatch]
  );

  return {
    onDragEnd,
  };
};
