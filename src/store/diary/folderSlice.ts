import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';
import { SearchResultType } from '@/hooks/useSearchPlace';

interface IFolderState {
  title: string;
  color: IconColorKeyType;
  icon: IconKeySet;
  places: SearchResultType[];
}

const initialState: IFolderState[] = [];

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    addFolder: (
      state,
      action: PayloadAction<{
        title: string;
        color: IconColorKeyType;
        icon: IconKeySet;
      }>,
    ) => {
      const { title, color, icon } = action.payload;
      state.push({ title, color, icon, places: [] });
    },
    addPlaceInFolder: (
      state,
      action: PayloadAction<{ index: number; place: SearchResultType }>,
    ) => {
      const { index, place } = action.payload;
      const foundIndex = state[index].places.findIndex((p) => p.id === place.id);
      if (foundIndex < 0) {
        state.forEach((f, idx) => {
          if (idx !== index) f.places = f.places.filter((p) => p.id !== place.id);
        });
        state[index].places.push(place);
      }
    },
    removePlaceInFolder: (state, action: PayloadAction<string>) => {
      state.forEach((f) => (f.places = f.places.filter((p) => p.id !== action.payload)));
    },
  },
});

export const { addFolder, addPlaceInFolder, removePlaceInFolder } = folderSlice.actions;

export default folderSlice.reducer;
