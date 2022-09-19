import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchResultType } from '@/hooks/useSearchPlace';

interface IDiaryState {
  post: {
    date: string;
    title: string;
    content: string;
    thumbnail: string | null;
    images: string[];
    places: SearchResultType[];
  };
}

const initialState: IDiaryState = {
  post: { date: '', title: '', content: '', thumbnail: null, images: [], places: [] },
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<SearchResultType>) => {
      const index = state.post.places.findIndex((place) => place.id === action.payload.id);
      if (index < 0) {
        state.post.places.push(action.payload);
      }
    },
    removePlace: (state, action: PayloadAction<SearchResultType>) => {
      const next = [...state.post.places];
      state.post.places = next.filter((pc) => pc.id !== action.payload.id);
    },
    clearPlace: (state) => {
      state.post.places = [];
    },
    setDiaryContent: (
      state,
      {
        payload,
      }: PayloadAction<{
        title: string;
        content: string;
        thumbnail: string | null;
        images: string[];
      }>,
    ) => {
      state.post = {
        ...state.post,
        title: payload.title,
        content: payload.content,
        thumbnail: payload.thumbnail,
        images: payload.images,
      };
    },
    setImages: (state, action: PayloadAction<string>) => {
      state.post.images.push(action.payload);
    },
  },
});

export const { addPlace, removePlace, clearPlace, setDiaryContent } = diarySlice.actions;
export default diarySlice.reducer;
