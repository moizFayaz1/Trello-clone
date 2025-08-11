import Dexie from "dexie";

export const db = new Dexie("TrelloDB");
db.version(4).stores({
  users: "++id, name, username, email, password, confirmPassword",

  boards: `++id, 
  title, 
  background_type, 
  background_color, 
  background_image_url, 
  visibility, 
  is_archived, 
  is_starred, 
  workspace_id, 
  owner_id, 
  created_at, 
  updated_at, 
  position`,

  lists: `++id, title, board_id, position, is_archived, created_at, updated_at`,

  cards: `++id, title, content, list_id, position, is_archived, created_at, updated_at, due_date, labels, description`,
});

window.db = db;
