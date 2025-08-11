import { Check } from "lucide-react";
import { forwardRef } from "react";

const ImageBackgroundItem = forwardRef(
  ({ bg, onSelect, index, isSelected, bgSize }, ref) => {
      
    return (
      <>
        <button
          ref={ref}
          key={index}
          className={`w-full ${bgSize} rounded relative transition-all overflow-hidden cursor-pointer bg-no-repeat  ${
            isSelected ? "opacity-[0.4]" : ""
          }`}
          onClick={() => onSelect({ index: index, type: "image" })}
          style={{
            backgroundImage: `url(${bg.thumb})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isSelected && (
            <span className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-1/2">
              <Check className="w-4 h-4 text-black" />
            </span>
          )}
        </button>
      </>
    );
  }
);

export default ImageBackgroundItem;
