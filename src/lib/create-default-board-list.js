// import { db } from "@/config/db";
import { addBulkList } from "@/features/boards/boardThunk";
import { v4 as generateUUID } from "uuid";

export const createDefaultBoardList = async (boardId, dispatch) => {
  const defaultList = [
    {
      id: generateUUID(),
      title: "To Do",
      board_id: boardId,
      position: 1,
      is_archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      title: "In Progress",
      board_id: boardId,
      position: 2,
      is_archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      title: "Done",
      board_id: boardId,
      position: 3,
      is_archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  try {
   await dispatch(addBulkList(defaultList));
    // await db.lists.bulkAdd(defaultList);
  } catch (error) {
    console.log(error);
  }
};
