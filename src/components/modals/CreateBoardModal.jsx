import { useBoardCreationModals } from "@/hooks/useBoardCreationModals";
import { BOARD_BACKGROUNDS_COLOR } from "@/data/backgrounds";
import { useUnsplash } from "@/hooks/useUnsplash";
import BackgroundGrid from "./BackgroundGrid";
import BoardCreation from "./BoardCreation";
import { useSelector } from "react-redux";
import BaseModal from "./BaseModal";
import { useEffect } from "react";
import DESIGN_TOKENS from "@/styles/tokens";
import LimitedBackgroundsModal from "./LimitedBackgroundsModal";
import AllBackgroundsModal from "./AllBackgroundsModal";

const CreateBoardModal = ({ isOpen, onClose, onSelect }) => {
  const selectedBackground = useSelector(
    (state) => state.modals.selectedBackground
  );
  const { backgrounds, searchBackgrounds, loading } = useUnsplash();
  const { handleModalFlow, modalState, closeModal, closeAllModals } =
    useBoardCreationModals();
  const modalPosition =
    modalState.openedFrom === "navigation"
      ? "right-2"
      : "right-[calc(100vw-800px)]";

  useEffect(() => {
    if (isOpen) searchBackgrounds();
  }, [isOpen, backgrounds.length, searchBackgrounds]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-14  max-h-[calc(100vh-70px)] w-74 z-20  ${DESIGN_TOKENS.colors.overlay} rounded-lg border border-gray-700 flex flex-col ${modalPosition}`}
    >
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Create board"
        backBtn={true}
      >
        <div className="px-2">
          {/* Board Preview */}
          <div className="mb-6">
            <div
              className="w-[80%] mx-auto h-32 rounded-lg relative bg-no-repeat"
              style={
                selectedBackground.type === "image"
                  ? {
                      backgroundImage: `url(${
                        backgrounds[selectedBackground.index]?.regular
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {
                      backgroundColor:
                        BOARD_BACKGROUNDS_COLOR[selectedBackground.index],
                    }
              }
            >
              <div className="absolute inset-0 p-3 flex justify-center items-center">
                <img src="/public/boardbgBg.svg" alt="" />
              </div>
            </div>
          </div>

          {/* Background Selection */}
          <div className="mb-6">
            <h3 className="text-slate-300 text-sm font-medium mb-1">
              Background
            </h3>

            <BackgroundGrid
              backgrounds={backgrounds}
              onSelect={onSelect}
              selectedBackground={selectedBackground}
              onOpenBackgrounds={handleModalFlow.openBackgrounds}
              variant="default"
            />
          </div>

          {/* Board Creation */}
        </div>
        <div className="px-2 py-4 mb-5">
          <BoardCreation
            onClose={closeAllModals}
            ImageBgUrl={
              selectedBackground.type === "image"
                ? backgrounds[selectedBackground.index]
                : null
            }
            boardColorBg={
              selectedBackground.type === "color"
                ? BOARD_BACKGROUNDS_COLOR[selectedBackground.index]
                : null
            }
          />
        </div>
      </BaseModal>
      <LimitedBackgroundsModal
        isBackgroundsOpen={modalState.limitedBackgrounds}
        backgrounds={backgrounds}
        selectedBackground={selectedBackground}
        onSelect={onSelect}
        showAllBackgrounds={handleModalFlow.showAllBackgrounds}
        closeModal={closeModal}
      />
      <AllBackgroundsModal
        onSelect={onSelect}
        loading={loading}
        backgrounds={backgrounds}
        selectedBackground={selectedBackground}
        onReturntoLimitedBackgrounds={handleModalFlow.backToLimitedBackgrounds}
        isAllBackgroundsOpen={modalState.allBackgrounds}
        closeAllBackgrounds={handleModalFlow.backToCreateBoard}
      />
    </div>
  );
};

export default CreateBoardModal;
