import { db } from "@/config/db";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBoards = createAsyncThunk(
  "boards/getBoards",
  async (_, { rejectWithValue }) => {
    try {
      const boards = await db.boards.toArray();
      return boards;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (newBoard, { rejectWithValue }) => {
    try {
      await db.boards.add(newBoard);
      return newBoard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSingleBoardWithList = createAsyncThunk(
  "boards/getBoardWithList",
  async (boardId, { rejectWithValue }) => {
    try {
      const board = await db.boards.get(boardId);

      if (!board) {
        throw new Error("Board Not Found");
      }

      const lists = await db.lists
        .where("board_id")
        .equals(boardId)
        .sortBy("position");

      // Get cards for each list
      const listsWithCards = await Promise.all(
        lists.map(async (list) => {
          const cards = await db.cards
            .where("list_id")
            .equals(list.id)
            .sortBy("position");

          return {
            ...list,
            cards: cards,
          };
        })
      );

      return {
        ...board,
        lists: listsWithCards,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCard = createAsyncThunk(
  "boards/createCard",
  async (newCard, { rejectWithValue }) => {
    try {
      const cardId = await db.cards.add(newCard);
      return { ...newCard, id: cardId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createList = createAsyncThunk(
  "lists/createList",
  async (newList, { rejectWithValue }) => {
    try {
      const listId = await db.lists.add(newList);
      return { ...newList, id: listId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBulkList = createAsyncThunk(
  "lists/addBulkList",
  async (newLists, { rejectWithValue }) => {
    try {
      await db.lists.bulkAdd(newLists);
      return newLists;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
