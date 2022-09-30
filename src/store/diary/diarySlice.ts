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
  thumbnail: string;
  places: SearchResultType[];
  images: ImageFileType[];
  tempImages: ImageFileType[];
  [key: string]: string | null | SearchResultType[] | ImageFileType[];
}

const initialState: IDiaryState = {
  date: '',
  title: '',
  content: '',
  thumbnail: '',
  places: [],
  images: [],
  tempImages: [],
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
    addTempPlace: (state, action: PayloadAction<SearchResultType>) => {
      const index = state.places.findIndex((place) => place.id === action.payload.id);
      if (index < 0) {
        state.places.push(action.payload);
      }
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
    addTempImage: (state, action: PayloadAction<ImageFileType>) => {
      const index = state.tempImages.findIndex(({ id: imgId }) => imgId === action.payload.id);
      if (index < 0) {
        state.tempImages.push(action.payload);
      }
    },
    removeTempImage: (state, action: PayloadAction<string>) => {
      state.tempImages = state.tempImages.filter((img) => img.id !== action.payload);
    },
    setDiaryByName: (
      state,
      action: PayloadAction<{ name: 'content' | 'title' | 'thumbnail' | 'date'; value: string }>,
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearDiary: (state) => {
      state.date = '';
      state.title = '';
      state.content = '';
      state.thumbnail = '';
      state.places = [];
      state.images = [];
      state.tempImages = [];
    },
  },
});

export const {
  addPlace,
  removePlace,
  addTempPlace,
  addImage,
  removeImage,
  addTempImage,
  removeTempImage,
  setDiaryByName,
  clearDiary,
} = diarySlice.actions;
export default diarySlice.reducer;
