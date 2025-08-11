import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "dark",
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;