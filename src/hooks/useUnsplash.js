import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { fetchUnsplashBackgrounds } from "../features/unsplash/unsplashThunk";
import {
  setSelectedBackground,
  clearBackgrounds,
} from "../features/unsplash/unsplashSlice";
export const useUnsplash = () => {
  const dispatch = useDispatch();
  const { backgrounds, loading, error, selectedBackground } = useSelector(
    (state) => state.unsplash
  );

  const searchBackgrounds = useCallback(
    (page = 1) => {
      if (backgrounds.length === 0 && !loading) {
        dispatch(fetchUnsplashBackgrounds(page));
      }
    },
    [backgrounds.length, loading, dispatch]
  );

  // const getRandomBackgrounds = (count = 10) => {
  //   dispatch(fetchRandomBackgrounds(count));
  // };

  const selectBackground = useCallback(
    (background) => {
      dispatch(setSelectedBackground(background));
    },
    [dispatch]
  );

  const clearSelectedBackground = useCallback(() => {
    dispatch(clearBackgrounds());
  }, [dispatch]);

  return {
    backgrounds,
    loading,
    error,
    selectedBackground,
    searchBackgrounds,
    // getRandomBackgrounds,
    selectBackground,
    clearSelectedBackground,
  };
};
