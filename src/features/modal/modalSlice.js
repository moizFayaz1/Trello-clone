import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modals",
  initialState: {
    createBoard: false,
    limitedBackgrounds: false,
    allBackgrounds: false,
    openedFrom: "navigation",
    selectedBackground: {
      index: 0,
      type: "image",
    },
  },
  reducers: {
    openModal: (state, action) => {
      state[action.payload] = true;
    },
    closeModal: (state, action) => {
      state[action.payload] = false;
    },
    closeAllModals: (state) => {
      state.createBoard = false;
      state.limitedBackgrounds = false;
      state.allBackgrounds = false;
    },
    setSelectedBackground: (state, action) => {
      state.selectedBackground = action.payload;
    },
    setOpenedFrom: (state, action) => {
      state.openedFrom = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  closeAllModals,
  setSelectedBackground,
  setOpenedFrom,
} = modalSlice.actions;
export default modalSlice.reducer;
