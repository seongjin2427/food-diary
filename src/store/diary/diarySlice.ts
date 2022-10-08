import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchResultType } from '@/hooks/useSearchPlace';

export interface ImageFileType {
  img_id: string;
  src: string;
}

export interface IDiaryState {
  did?: number;
  date: string;
  title: string;
  content: string;
  thumbnail: string;
  places: SearchResultType[];
  images: ImageFileType[];
  tempImages: ImageFileType[];
  [key: string]: string | null | number | undefined | SearchResultType[] | ImageFileType[];
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
      const index = state.images.findIndex(({ img_id }) => img_id === action.payload.img_id);
      if (index < 0) {
        state.images.push(action.payload);
        state.images.sort((a, b) => +a.img_id - +b.img_id);
      }
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((img) => img.img_id !== action.payload);
    },
    addTempImage: (state, action: PayloadAction<ImageFileType>) => {
      const index = state.tempImages.findIndex(({ img_id }) => img_id === action.payload.img_id);
      if (index < 0) {
        state.tempImages.push(action.payload);
      }
    },
    removeTempImage: (state, action: PayloadAction<string>) => {
      state.tempImages = state.tempImages.filter((img) => img.img_id !== action.payload);
    },
    setDiaryByName: (
      state,
      action: PayloadAction<{ name: 'content' | 'title' | 'thumbnail' | 'date'; value: string }>,
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setDiary: (state, actions: PayloadAction<IDiaryState>) => {
      const { did, title, content, date, images, places, thumbnail } = actions.payload;
      state.did = did;
      state.title = title;
      state.content = content;
      state.thumbnail = thumbnail;
      state.places = places;
      state.images = images;
      state.date = date;
      state.tempImages = [];
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
  setDiary,
  clearDiary,
} = diarySlice.actions;
export default diarySlice.reducer;
