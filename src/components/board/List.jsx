import { Droppable, Draggable } from "@hello-pangea/dnd";
import { MoreHorizontal, Plus, X } from "lucide-react";
import { Card } from "./Card";
import { useState } from "react";

export const List = ({ list, cards, index, onAddCard }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardContent, setNewCardContent] = useState("");

  const handleAddCard = () => {
    if (!newCardContent.trim()) {
      setIsAddingCard(false);
      return;
    }
    onAddCard(list.id, newCardContent.trim());
    setNewCardContent("");
    setIsAddingCard(false);
  };

  return (
    <Draggable draggableId={list.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-[#101204]  mx-1 rounded-lg my-3 min-w-70 h-fit transition-none ${
            snapshot.isDragging ? "  opacity-60 translate-none" : ""
          } `}
        >
          <div
            className="flex justify-between  py-3 px-4 !cursor-pointer"
            {...provided.dragHandleProps}
          >
            <h3 className="text-white font-medium text-sm">{list.title}</h3>
            <button className="text-white/60 cursor-pointer hover:text-white transition-none">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-[calc(75vh-70px)] list overflow-y-auto list  ">
            <Droppable droppableId={list.id.toString()} type="card">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex flex-col p-2  transition-none`}
                >
                  {cards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="px-2 py-1 mb-1">
            {isAddingCard ? (
              <div className="space-y-2">
                <textarea
                  className="w-full rounded-md bg-[#22272b] p-2.5 text-sm text-white/90 placeholder:text-white/50 resize-none min-h-[80px] border-2 border-[#85b8ff] hover:border-transparent focus:outline-none transition-colors"
                  placeholder="Enter a title for this card..."
                  value={newCardContent}
                  onChange={(e) => setNewCardContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddCard();
                    }
                  }}
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddCard}
                    className="px-3 py-1.5 bg-blue-600 cursor-pointer text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-none"
                  >
                    Add card
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingCard(false);
                      setNewCardContent("");
                    }}
                    className="p-1.5 text-white/70 cursor-pointer hover:text-white/90 transition-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingCard(true)}
                className="flex w-full items-center cursor-pointer gap-2 px-2 py-1.5 text-white/60 hover:text-white/80 hover:bg-gray-500/20 rounded-md transition-none text-sm"
              >
                <Plus className="w-4 h-4" />
                Add a card
              </button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
