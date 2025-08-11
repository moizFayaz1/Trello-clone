import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export const Card = ({ card, index }) => {
  // console.log(card, "card")

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`px-3 py-[7px] my-1 transition-colors rounded-md text-left bg-[#22272B] hover:border-white border-2 border-transparent  ${
            snapshot.isDragging ? "opacity-60 " : ""
          }`}
        >
          <p className="text-sm text-[#B6C2CF]">{card.title || card.content}</p>
          {/* {card.description && (
            <p className="text-xs text-white/60 mt-1">{card.description}</p>
          )} */}
        </div>
      )}
    </Draggable>
  );
};
