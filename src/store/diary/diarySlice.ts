import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchResultType } from '@/hooks/useSearchPlace';

interface ImageFileType {
  id: string;
  src: string;
}

interface IDiaryState {
  date: string;
  title: string;
  content: string;
  thumbnail: string | null;
  images: ImageFileType[];
  places: SearchResultType[];
  [key: string]: string | null | SearchResultType[] | ImageFileType[];
}

const initialState: IDiaryState = {
  date: '',
  title: '',
  content: '',
  thumbnail: null,
  images: [],
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
      state.places = state.places.filter((pc) => pc.id !== action.payload.id);
    },
    clearPlace: (state) => {
      state.places = [];
    },
    addImage: (state, action: PayloadAction<ImageFileType>) => {
      const index = state.images.findIndex(({ id: imgId }) => imgId === action.payload.id);
      if (index < 0) {
        state.images.push(action.payload);
        state.images.sort((a, b) => +a.id - +b.id);
      }
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((img) => img.id !== action.payload);
    },
    setDiaryByName: (
      state,
      action: PayloadAction<{ name: 'content' | 'title' | 'thumbnail' | 'date'; value: string }>,
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearDiary: (state) => {
      state = initialState;
    },
  },
});

export const {
  addPlace,
  removePlace,
  clearPlace,
  addImage,
  removeImage,
  setDiaryByName,
  clearDiary,
} = diarySlice.actions;
export default diarySlice.reducer;
