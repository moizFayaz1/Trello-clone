export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: (username = ":username") => `/u/${username}/boards`,
  BOARD: (id = ":id", title = ":title") => `/b/${id}/${title}`,
};
