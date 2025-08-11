import React from "react";
import { ChevronLeft, X } from "lucide-react";

const BaseModal = ({
  isOpen,
  onClose,
  children,
  isBackgroundsOpen,
  isAllBackgroundsOpen,
  onReturntoLimited,
  title,
  backBtn = false,
}) => {
  return (
    <>
      {/* Header */}
      {(isOpen || isBackgroundsOpen || isAllBackgroundsOpen) && (
        <>
          <div className="flex items-center justify-between py-3 px-2 flex-shrink-0">
            {backBtn && (
              <button className="text-slate-400 hover:bg-gray-500 p-2 cursor-pointer rounded" onClick={onReturntoLimited}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 2L2 8l6 6 1.414-1.414L5.828 9H14V7H5.828l3.586-3.586L8 2z" />
                </svg>
              </button>
            )}
            <p className="text-slate-300 text-sm font-semibold mx-auto">
              {title}
            </p>
            <button
              className="text-slate-400 hover:bg-gray-500 p-2 cursor-pointer rounded"
              onClick={() => onClose("limitedBackgrounds")}
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-grow overlay overflow-y-auto">{children}</div>
        </>
      )}
    </>
  );
};

export default BaseModal;
