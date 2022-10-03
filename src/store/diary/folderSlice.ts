import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { addFolderApi } from '@/api/diary';

export interface FolderSliceFolderType {  
  fid?: number;
  title: string;
  color: IconColorKeyType;
  icon: IconKeySet;
  places: SearchResultType[];

}
export interface IFolderState {
  folders: FolderSliceFolderType[];
}

const initialState: IFolderState = { folders: [] };

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
      state.folders.push({ title, color, icon, places: [] });
      addFolderApi({ title, color, icon, places: [] })
    },
    addPlaceInFolder: (
      state,
      action: PayloadAction<{ index: number; place: SearchResultType }>,
    ) => {
      const { index, place } = action.payload;
      const foundIndex = state.folders[index].places.findIndex((p) => p.id === place.id);
      if (foundIndex < 0) {
        state.folders.forEach((f, idx) => {
          if (idx !== index) f.places = f.places.filter((p) => p.id !== place.id);
        });
        state.folders[index].places.push(place);
      }
    },
    removePlaceInFolder: (state, action: PayloadAction<string>) => {
      state.folders.forEach((f) => (f.places = f.places.filter((p) => p.id !== action.payload)));
    },
    replaceFolders: (state, action: PayloadAction<FolderSliceFolderType[]>) => {
      state.folders = action.payload;
    },
  },
});

export const { addFolder, addPlaceInFolder, removePlaceInFolder, replaceFolders } =
  folderSlice.actions;

export default folderSlice.reducer;
