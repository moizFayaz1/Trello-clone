import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { db } from "@/config/db";
import { List } from "./List";
import {
  getSingleBoardWithList,
  createCard,
  createList,
} from "@/features/boards/boardThunk";
import { toast } from "sonner";
import Navigation from "./Navigation";
import { Plus, X } from "lucide-react";
import { v4 as generateUUID } from "uuid";

const Board = () => {
  const { id } = useParams();
  const [isaddingList, setIsAddingList] = useState(false);
  const { currentBoard, loading, listJustAdded } = useSelector(
    (state) => state.boards
  );
  const { onDragEnd } = useDragAndDrop(currentBoard);
  const [newListName, setNewListName] = useState("");
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const bgImage = currentBoard?.background_image_url;
  const bgColor = currentBoard?.background_color;

  useEffect(() => {
    if (id) {
      dispatch(getSingleBoardWithList(id));
    }
  }, [id, dispatch]);

  // console.log(currentBoard)

  const handleAddCard = async (listId, cardContent) => {
    try {
      const existingCards = await db.cards
        .where("list_id")
        .equals(listId)
        .sortBy("position");
      const nextPosition = existingCards.length + 1;

      const newCard = {
        // id: generateUUID(),
        title: cardContent,
        content: cardContent,
        list_id: listId,
        position: nextPosition,
        is_archived: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      dispatch(createCard(newCard));
    } catch (error) {
      console.error("Failed to add card:", error);
    }
  };

  // console.log(currentBoard);

  const handleAddList = async () => {
    if (!newListName.trim()) return;

    const existingLists = await db.lists
      .where("board_id")
      .equals(id)
      .sortBy("position");
    const nextPosition = existingLists.length + 1;

    const newList = {
      id: generateUUID(),
      title: newListName,
      board_id: id,
      position: nextPosition,
      is_archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(createList(newList));
    setIsAddingList(false);
    setNewListName("");
  };

  useEffect(() => {
    if (listJustAdded && containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [currentBoard?.lists?.length, listJustAdded]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-lg">Loading board...</div>
      </div>
    );
  }

  if (!currentBoard) {
    toast.error("Board Not Found");
  }

  return (
    <div
      className="h-full bg-cover bg-center "
      style={
        bgImage
          ? { backgroundImage: `url('${bgImage.full}')` }
          : { backgroundColor: bgColor }
      }
    >
      <Navigation title={currentBoard.title} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              ref={(el) => {
                provided.innerRef(el);
                containerRef.current = el;
              }}
              {...provided.droppableProps}
              className={`flex justify-start min-h-[90%]   overflow-x-auto  w-full select-none`}
            >
              {[...currentBoard.lists]
                .sort((a, b) => a.position - b.position)
                .map((list, index) => {
                  const listCards = [...(list.cards || [])].sort(
                    (a, b) => a.position - b.position
                  );

                  return (
                    <List
                      key={list.id}
                      list={list}
                      index={index}
                      cards={listCards}
                      onAddCard={handleAddCard}
                    />
                  );
                })}
              {provided.placeholder}

              {isaddingList ? (
                <div className="flex flex-col gap-3 justify-center  min-w-70 ml-3 mr-2 px-2 py-3 my-3 rounded-lg bg-[#101204] h-fit">
                  <input
                    type="text"
                    className="w-full rounded-md bg-[#22272b] p-2.5 text-sm text-white/90 placeholder:text-white/50   border-2 border-[#85b8ff] focus:outline-none transition-colors shadow-2xl "
                    placeholder="Enter list name..."
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAddList();
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex items-center gap-2 ">
                    <button
                      onClick={handleAddList}
                      className="px-3 py-1.5 bg-blue-600 cursor-pointer text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-none"
                    >
                      Add card
                    </button>
                    <button
                      className="p-1.5 text-white/70 cursor-pointer hover:text-white/90 transition-none"
                      onClick={() => setIsAddingList(false)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="flex p-2.5 gap-2 transition-colors justify-start items-center bg-white/20 hover:bg-white/10 my-3 min-w-70 ml-3 mr-2 h-fit rounded-lg cursor-pointer text-black/90"
                  onClick={() => setIsAddingList(true)}
                >
                  <button className="cursor-pointer transition-none">
                    <Plus className="w-4 h-4" />
                  </button>
                  <h3 className="font-medium text-sm">Add another list</h3>
                </div>
              )}

              {/* <div className="w-60 h-20 bg-blue-400"></div> */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
