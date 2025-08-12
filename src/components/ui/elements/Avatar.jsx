export const Avatar = ({
  children,
  className = "",
  size = "w-[22px] h-[22px]",
}) => (
  <div
    className={`${size} bg-green-600 rounded-full select-none flex items-center justify-center ${className} text-white text-xs `}
  >
    {children}
  </div>
);
