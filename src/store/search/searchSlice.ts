import { getToday } from '@/utils/date';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
  searchWord: string;
  searchOption: 'map' | 'folder';
  prevDate: string;
  nextDate: string;
  showList: boolean;
}

const initialState: ISearchState = {
  searchWord: '',
  searchOption: 'folder',
  prevDate: getToday()[0].toString(),
  nextDate: getToday()[1].toString(),
  showList: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchBySearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
    selectSearchOption: (state, action: PayloadAction<'map' | 'folder'>) => {
      state.searchOption = action.payload;
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
    toggleShowList: (state) => {
      state.showList = !state.showList;
    },
  },
});

export const {
  searchBySearchWord,
  selectSearchOption,
  selectSearchDate,
  clearSearchStates,
  toggleShowList,
} = searchSlice.actions;

export default searchSlice.reducer;
