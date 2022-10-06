import { getToday } from '@/utils/date';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
  searchWord: string;
  prevDate: string;
  nextDate: string;
}

const initialState: ISearchState = {
  searchWord: '',
  prevDate: getToday()[0].toString(),
  nextDate: getToday()[1].toString(),
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchBySearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
    selectSearchDate: (
      state,
      action: PayloadAction<{ name: 'prevDate' | 'nextDate'; date: string }>,
    ) => {
      const { name, date } = action.payload;
      state[name] = date.toString();
    },
    clearSearchStates: (state) => {
      state.searchWord = '';
      state.prevDate = getToday()[0].toString();
      state.nextDate = getToday()[1].toString();
    },
  },
});

export const { searchBySearchWord, selectSearchDate, clearSearchStates } = searchSlice.actions;

export default searchSlice.reducer;
