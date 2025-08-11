import { createSlice } from "@reduxjs/toolkit";
import {
  createBoard,
  getSingleBoardWithList,
  createCard,
  createList,
  addBulkList,
  getBoards,
} from "./boardThunk";

const initialState = {
  boards: [],
  currentBoard: { lists: [] },
  loading: false,
  listJustAdded: false,
  error: null,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action) => {
      const { id, updates } = action.payload;
      const boardIndex = state.boards.findIndex((board) => board.id === id);
      if (boardIndex !== -1) {
        state.boards[boardIndex] = { ...state.boards[boardIndex], ...updates };
      }
      // Also update currentBoard if it's the same board
      if (state.currentBoard && state.currentBoard.id === id) {
        state.currentBoard = { ...state.currentBoard, ...updates };
      }
    },
    addCardToBoard: (state, action) => {
      const { listId, card } = action.payload;
      if (state.currentBoard) {
        const listIndex = state.currentBoard.lists.findIndex(
          (list) => list.id === listId
        );
        if (listIndex !== -1) {
          if (!state.currentBoard.lists[listIndex].cards) {
            state.currentBoard.lists[listIndex].cards = [];
          }
          state.currentBoard.lists[listIndex].cards.push(card);
        }
      }
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
    clearBoards: (state) => {
      state.boards = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
        state.error = null;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
        state.error = null;
        state.currentBoard = action.payload;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSingleBoardWithList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleBoardWithList.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
        state.error = null;
      })
      .addCase(getSingleBoardWithList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createCard.fulfilled, (state, action) => {
        const card = action.payload;
        if (state.currentBoard) {
          const listIndex = state.currentBoard.lists.findIndex(
            (list) => list.id === card.list_id
          );
          if (listIndex !== -1) {
            if (!state.currentBoard.lists[listIndex].cards) {
              state.currentBoard.lists[listIndex].cards = [];
            }
            state.currentBoard.lists[listIndex].cards.push(card);
          }
        }
      })

      .addCase(createList.fulfilled, (state, action) => {
        const list = action.payload;
        if (state.currentBoard) {
          if (!state.currentBoard) {
            state.currentBoard.lists = [];
          }
          state.currentBoard.lists.push(list);
          state.listJustAdded = true;
        }
      })

      .addCase(addBulkList.fulfilled, (state, action) => {
        if (!state.currentBoard) return;
        state.currentBoard.lists ??= [];
        state.currentBoard.lists.push(...action.payload);
      });
  },
});

export const {
  setBoards,
  addBoard,
  updateBoard,
  addCardToBoard,
  deleteBoard,
  clearBoards,
  setLoading,
  setError,
  clearError,
} = boardSlice.actions;

export default boardSlice.reducer;
