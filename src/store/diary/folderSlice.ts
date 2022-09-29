import { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFolderState {
  id?: string;
  title: string;
  color: IconColorKeyType;
  icon: IconKeySet;
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
      state.push({ title, color, icon });
    },
  },
});

export const { addFolder } = folderSlice.actions;

export default folderSlice.reducer;
