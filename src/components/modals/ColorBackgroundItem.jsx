import { Check } from "lucide-react";
import React from "react";

const ColorBackgroundItem = ({ index, onSelect, bg, isSelected,bgSize  }) => {
 


  return (
    <button
      key={index + 4}
      className={`w-full ${bgSize} rounded relative border-2 transition-all  cursor-pointer ${
        isSelected ? "opacity-[0.4]" : ""
      }`}
      onClick={() => onSelect({ index: index, type: "color" })}
      style={{ backgroundColor: bg }}
    >
      {isSelected && (
        <span className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-1/2">
          <Check className="w-4 h-4 text-black" />
        </span>
      )}
    </button>
  );
};

export default ColorBackgroundItem;
