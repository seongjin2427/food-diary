import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResultType } from '@/hooks/useSearchPlace';

interface IDiaryState {
  places: SearchResultType[];
}

const initialState: IDiaryState = {
  places: [
    {
      address_name: '',
      category_group_code: '',
      category_group_name: '',
      category_name: '',
      distance: '',
      id: '',
      phone: '',
      place_name: '',
      place_url: '',
      road_address_name: '',
      x: '',
      y: '',
    },
  ],
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setDiary: (state, actions: PayloadAction<SearchResultType[]>) => {
      state.places = actions.payload;
    },
  },
});

export const { setDiary } = diarySlice.actions;
export default diarySlice.reducer;
