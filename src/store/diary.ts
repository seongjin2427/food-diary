import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchResultType } from '@/hooks/useSearchPlace';
import { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';

interface ImageFileType {
  id: string;
  src: string;
}

interface IDiaryState {
  post: {
    date: string;
    title: string;
    content: string;
    thumbnail: string | null;
    images: ImageFileType[];
    places: SearchResultType[];
  };
  folder: {
    id?: string;
    title: string;
    color: IconColorKeyType;
    icon: IconKeySet;
  }[];
  additionalInfo: {
    menu: string;
    price: number;
  }[];
}

const initialState: IDiaryState = {
  post: { date: '', title: '', content: '', thumbnail: null, images: [], places: [] },
  folder: [],
  additionalInfo: [
    {
      menu: '',
      price: 0,
    },
  ],
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
    setDate: (state, action: PayloadAction<string>) => {
      state.post.date = action.payload;
    },
    setDiaryContent: (
      state,
      action: PayloadAction<{
        title: string;
        content: string;
        thumbnail: string | null;
        images: ImageFileType[];
      }>,
    ) => {
      const next = {
        ...state.post,
        title: action.payload.title,
        content: action.payload.content,
        thumbnail: action.payload.thumbnail,
        images: action.payload.images,
      };
      state.post = next;
    },
    setImage: (state, action: PayloadAction<ImageFileType>) => {
      state.post.images.push(action.payload);
    },
    clearDiary: (state) => {
      state.post = initialState.post;
    },
    addFolder: (
      state,
      action: PayloadAction<{
        title: string;
        color: IconColorKeyType;
        icon: IconKeySet;
      }>,
    ) => {
      const { title, color, icon } = action.payload;
      state.folder.push({ title, color, icon });
    },
    addAdditionalInfo: (state) => {
      state.additionalInfo.push({ menu: '', price: 0 });
    },
    setAdditionalInfo: (
      state,
      action: PayloadAction<{ idx: number; name: string; value: string }>,
    ) => {
      const { idx, name, value } = action.payload;
      const nextInfo = { ...state.folder[idx], [name]: value };
      state.folder[idx] = nextInfo;
    },
  },
});

export const {
  addPlace,
  removePlace,
  clearPlace,
  setDate,
  setDiaryContent,
  setImage,
  clearDiary,
  addFolder,
  addAdditionalInfo,
  setAdditionalInfo,
} = diarySlice.actions;
export default diarySlice.reducer;
