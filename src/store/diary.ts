import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchResultType } from '@/hooks/useSearchPlace';

interface IDiaryState {
  places: SearchResultType[];
}

const initialState: IDiaryState = {
  places: [],
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<SearchResultType>) => {
      const index = state.places.findIndex((place) => place.id === action.payload.id);
      if (index < 0) {
        state.places.push(action.payload);
      }
    },
    removePlace: (state, action: PayloadAction<SearchResultType>) => {
      const next = [...state.places];
      state.places = next.filter((pc) => pc.id !== action.payload.id);
    },
    clearPlace: (state) => {
      state.places = [];
    },
  },
});

export const { addPlace, removePlace, clearPlace } = diarySlice.actions;
export default diarySlice.reducer;
