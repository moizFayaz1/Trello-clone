import { createAsyncThunk } from "@reduxjs/toolkit";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const TRELLO_COLLECTIONS = [
  "317099", // Trello's main collection
  "1065976", // Business/productivity themes
  "139386", // Abstract patterns
  "1114848", // Nature/landscapes
];

export const fetchUnsplashBackgrounds = createAsyncThunk(
  "unsplash/fetchBackgrounds",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/collections/${TRELLO_COLLECTIONS[0]}/photos?per_page=20&page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const backgrounds = data.map((photo) => ({
        id: photo.id,
        regular: photo.urls.regular,
        thumb: photo.urls.thumb,
        full: photo.urls.full,
        alt: photo.alt_description || "Background image",
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        width: photo.width,
        height: photo.height,
      }));

      return backgrounds;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch backgrounds from Unsplash"
      );
    }
  }
);

// Alternative thunk for fetching random backgrounds
// export const fetchRandomBackgrounds = createAsyncThunk(
//   "unsplash/fetchRandomBackgrounds",
//   async (count = 10, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/photos/random?count=${count}&orientation=landscape`,
//         {
//           headers: {
//             Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Transform the data to include only the fields we need
//       const backgrounds = data.map((photo) => ({
//         id: photo.id,
//         url: photo.urls.regular,
//         thumb: photo.urls.thumb,
//         full: photo.urls.full,
//         alt: photo.alt_description || "Background image",
//         photographer: photo.user.name,
//         photographerUrl: photo.user.links.html,
//         width: photo.width,
//         height: photo.height,
//       }));

//       return backgrounds;
//     } catch (error) {
//       return rejectWithValue(
//         error.message || "Failed to fetch random backgrounds from Unsplash"
//       );
//     }
//   }
// );
