import { ChevronRight, ExternalLink } from "lucide-react";
import React from "react";

const AccountMenuItem = ({
  children,
  className,
  hasChevron,
  icon,
  onClick,
}) => {
  const baseClasses = `relative text-slate-300 px-4 py-2  cursor-pointer hover:bg-gray-500/50 transition-colors select-none`;

  return (
    <div className={`${baseClasses} ${className}`} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div>{icon}</div>}
          <span className="text-[#B6C2CF] ">{children}</span>
        </div>
        {hasChevron && (
          <ChevronRight className="w-4 h-4" />
        )}
      </div>
    </div>
  );
};

export default AccountMenuItem;
