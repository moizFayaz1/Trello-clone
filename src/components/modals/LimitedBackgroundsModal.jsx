import React from "react";
import BaseModal from "./BaseModal";
import DESIGN_TOKENS from "@/styles/tokens";
import BackgroundGrid from "./BackgroundGrid";

const LimitedBackgroundsModal = ({
  isBackgroundsOpen,
  backgrounds,
  selectedBackground,
  onSelect,
  closeModal,
  showAllBackgrounds
}) => {
  if (!isBackgroundsOpen) return null;

  return (
    <div
      className={`absolute top-1/2 trnsform -translate-y-1/2 right-16 h-100 w-74 z-40 ${DESIGN_TOKENS.colors.overlay} rounded-lg border border-gray-700 py-2 mx-auto`}
    >
      <BaseModal
      onClose={closeModal}
        isBackgroundsOpen={isBackgroundsOpen}
        title="Board backgrounds"
      >
        <div className="px-2">
          <BackgroundGrid
            backgrounds={backgrounds}
            selectedBackground={selectedBackground}
            variant="compact"
            onSelect={onSelect}
            showAllBackgrounds={showAllBackgrounds}
          />
        </div>
      </BaseModal>
    </div>
  );
};

export default LimitedBackgroundsModal;
