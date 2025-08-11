import DESIGN_TOKENS from "@/styles/tokens";

export const NavItem = ({
  icon: Icon,
  children,
  active = false,
  onClick,
  rightElement,
  arrowElement,
}) => {
  const baseClasses = `${DESIGN_TOKENS.layout.flexCenter} ${DESIGN_TOKENS.spacing.comfortable} rounded-md`;
  const interactiveClasses = active
    ? "rounded-md cursor-pointer"
    : DESIGN_TOKENS.interactive.navItem;
  const activeClasses = active
    ? "text-[#579DFF] rounded-md bg-[#1C2B41]"
    : DESIGN_TOKENS.colors.text.secondary;

  let WorkspaceIcon = Icon.displayName === "Crown" ? "" : "gap-2";

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${activeClasses} ${WorkspaceIcon} mb-1 relative 00-hidden group`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4 mr-3" />}
      <span className="text-sm flex-1 select-none ">{children}</span>
      <span
        className={`pr-2 transition-transform duration-200 ease-in-out ${
          arrowElement ? "group-hover:-translate-x-4" : ""
        }`}
      >
        {rightElement}
      </span>
      {arrowElement && (
        <div className="absolute pr-2 top-1/2 right-0 transform -translate-y-1/2 translate-x-3 -z-999 transition-transform duration-200 ease-in-out group-hover:translate-x-0 group-hover:z-999">
          {arrowElement}
        </div>
      )}
    </div>
  );
};
