import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchResultType } from '@/hooks/useSearchPlace';

export interface IFolderState {
  place: SearchResultType | undefined;
}

const initialState: IFolderState = { place: undefined };

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setPlace: (state, action: PayloadAction<SearchResultType>) => {
      state.place = action.payload;
    },
  },
});

export const { setPlace } = placeSlice.actions;

export default placeSlice.reducer;
