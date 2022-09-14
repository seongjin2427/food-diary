import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchResultType } from '@/hooks/useSearchPlace';

interface IDiaryState {
  post: {
    date: string;
    title: string;
    content: string;
    places: SearchResultType[];
  };
}

const initialState: IDiaryState = {
  post: { date: '', title: '', content: '', places: [] },
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
  },
});

export const { addPlace, removePlace, clearPlace } = diarySlice.actions;
export default diarySlice.reducer;
