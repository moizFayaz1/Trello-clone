import { Ellipsis } from "lucide-react";
import ImageBackgroundItem from "./ImageBackgroundItem";
import ColorBackgroundItem from "./ColorBackgroundItem";
import { BOARD_BACKGROUNDS_COLOR } from "@/data/backgrounds";
import { GRID_PRESETS } from "@/utils/gridConfigs";

// Configuration presets for different use cases

const BackgroundGrid = ({
  backgrounds,
  onSelect,
  selectedBackground,
  onOpenBackgrounds,
  showAllBackgrounds,
  variant = "default",
  customConfig = {},
}) => {
  const config = {
    ...GRID_PRESETS[variant],
    ...customConfig,
  };

  const {
    imageColumnSize,
    colorColumnSize,
    bgImageSize,
    bgColorSize,
    showMore,
    ImageBgHeight,
    ColorBgheight,

  } = config;

  const gridClasses = {
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
    8: "grid-cols-8",
  };

  return (
    <div>
      {variant === "compact" && (
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-semibold">Photo</p>
          <button className="px-2 h-9 rounded  font-semibold  bg-blue-200/10 hover:bg-gray-600 transition-all cursor-pointer" onClick={showAllBackgrounds}>
            view more
          </button>
        </div>
      )}

      <div className={`grid ${gridClasses[imageColumnSize]} gap-1 mb-2`}>
        {backgrounds.slice(0, bgImageSize).map((bg, index) => (
          <ImageBackgroundItem
            key={index}
            index={index}
            bg={bg}
            onSelect={onSelect}
            bgSize={ImageBgHeight}
            isSelected={
              selectedBackground.type === "image" &&
              selectedBackground.index === index
            }
          />
        ))}
      </div>

      {variant === "compact" && (
        <div className="flex justify-between items-center mb-1 mt-4">
          <p className="text-sm font-semibold">Colors</p>
          <button className="px-2 font-semibold h-9 rounded   bg-blue-200/10 hover:bg-gray-600 transition-all cursor-pointer" onClick={showAllBackgrounds}>
            view more
          </button>
        </div>
      )}

      <div className={`grid ${gridClasses[colorColumnSize]} gap-1`}>
        {BOARD_BACKGROUNDS_COLOR.slice(0, bgColorSize).map((bg, index) => (
          <ColorBackgroundItem
            key={index}
            index={index}
            bg={bg}
            onSelect={onSelect}
            bgSize={ColorBgheight}
            isSelected={
              selectedBackground.type === "color" &&
              selectedBackground.index === index
            }
          />
        ))}
        {showMore && (
          <button
            className="w-full h-8 rounded border-2 cursor-pointer border-transparent bg-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-600 transition-all"
            onClick={onOpenBackgrounds}
          >
            <Ellipsis className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BackgroundGrid;
