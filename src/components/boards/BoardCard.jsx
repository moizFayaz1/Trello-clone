export const BoardCard = ({
  title,
  bgImage,
  bgColor,
  onClick,
  TITLE_MAX_LENGTH = 35,
}) => (
  <div
    className="mb-2 cursor-pointer rounded-lg hover:opacity-60 transition-opacity"
    onClick={onClick}
  >
    <div
      className="h-24 rounded-lg bg-cover bg-center  overflow-hidden"
      style={
        bgImage
          ? { backgroundImage: `url('${bgImage}')` }
          : { backgroundColor: bgColor }
      }
    ></div>
    <div
      className="px-2 py-2 bg-[#1d2125] h-15 -mt-4 rounded-b-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)]
 "
    >
      <div className="text-sm font-[400] text-left">
        {title.length > TITLE_MAX_LENGTH
          ? title.slice(0, TITLE_MAX_LENGTH) + "..."
          : title}
      </div>
    </div>
  </div>
);
