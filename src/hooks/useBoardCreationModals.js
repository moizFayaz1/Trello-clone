import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  closeModal,
  closeAllModals,
  setSelectedBackground,
  setOpenedFrom,
} from "@/features/modal/modalSlice";

export const useBoardCreationModals = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals);

  const handleBackgroundSelect = (background) => {
    dispatch(setSelectedBackground(background));
    // dispatch(closeAllModals());
    // Reopen the create board modal after selection
    dispatch(openModal("createBoard"));
  };

  const handleModalFlow = {
    openBackgrounds: () => {
      // dispatch(closeModal('createBoard'));
      dispatch(openModal("limitedBackgrounds"));
    },
    showAllBackgrounds: () => {
      dispatch(closeModal("limitedBackgrounds"));
      dispatch(openModal("allBackgrounds"));
    },
    backToCreateBoard: () => {
      dispatch(closeAllModals());
      dispatch(openModal("createBoard"));
    },
    backToLimitedBackgrounds: () => {
      dispatch(closeModal("allBackgrounds"));
      dispatch(openModal("limitedBackgrounds"));
    },
  };

  return {
    modalState,
    setOpenedFrom,
    handleBackgroundSelect,
    handleModalFlow,
    openModal: (name) => dispatch(openModal(name)),
    closeModal: (name) => dispatch(closeModal(name)),
    closeAllModals: () => dispatch(closeAllModals()),
  };
};
