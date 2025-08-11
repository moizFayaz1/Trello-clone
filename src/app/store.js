import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";
import unsplashReducer from "../features/unsplash/unsplashSlice";
import modalReducer from "../features/modal/modalSlice";
import boardReducer from "../features/boards/boardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    unsplash: unsplashReducer,
    modals: modalReducer,
    boards: boardReducer,
  },
});
