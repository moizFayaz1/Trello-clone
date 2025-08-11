import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useState } from "react";
import { List } from "./List";

const initialData = {
  cards: {
    "card-1": { id: "card-1", content: "Task 1" },
    "card-2": { id: "card-2", content: "Task 2" },
    "card-3": { id: "card-3", content: "Task 3" },
  },
  lists: {
    "list-1": { id: "list-1", title: "To Do", cardIds: ["card-1", "card-2"] },
    "list-2": { id: "list-2", title: "In Progress", cardIds: ["card-3"] },
    "list-3": { id: "list-3", title: "Done", cardIds: [] },
  },
  listOrder: ["list-1", "list-3", "list-2"],
};

const Board = () => {
  const [data, setData] = useState(initialData);
  const { onDragEnd ,hoverIndex} = useDragAndDrop(data, setData);

  
  // console.log(hoverIndex)

  return (
    <div className="bg-gray-900 min-h-screen text-white animation-none transition-none duration-0 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex justify-start duration-0 w-fit items-start space-x-3 transition-none m-4 bg-red-500`}
            >
              
              {data.listOrder.map((listId, index) => {
                const list = data.lists[listId];
                const listCards = list.cardIds.map(
                  (cardId) => data.cards[cardId]
                );

                return (
                  <List
                    key={list.id}
                    list={list}
                    index={index}
                    hoverIndex={hoverIndex}
                    cards={listCards}
                    snapshot={snapshot}
                    onAddCard={(listId) => {
                      const newCardId = `card-${Date.now()}`;
                      const newCard = {
                        id: newCardId,
                        content: "New card",
                      };

                      setData((prev) => ({
                        ...prev,
                        cards: {
                          ...prev.cards,
                          [newCardId]: newCard,
                        },
                        lists: {
                          ...prev.lists,
                          [listId]: {
                            ...prev.lists[listId],
                            cardIds: [...prev.lists[listId].cardIds, newCardId],
                          },
                        },
                      }));
                    }}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
