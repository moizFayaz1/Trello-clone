import { createSlice } from "@reduxjs/toolkit";
import { fetchUnsplashBackgrounds } from "./unsplashThunk";

const initialState = {
  backgrounds: [],
  loading: false,
  error: null,
  selectedBackground: null,
};

const unsplashSlice = createSlice({
  name: "unsplash",
  initialState,
  reducers: {
    setSelectedBackground: (state, action) => {
      state.selectedBackground = action.payload;
    },
    clearBackgrounds: (state) => {
      state.backgrounds = [];
      state.selectedBackground = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnsplashBackgrounds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnsplashBackgrounds.fulfilled, (state, action) => {
        state.loading = false;
        state.backgrounds = [...state.backgrounds, ...action.payload];
        state.error = null;
      })
      .addCase(fetchUnsplashBackgrounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedBackground, clearBackgrounds } = unsplashSlice.actions;
export default unsplashSlice.reducer; 