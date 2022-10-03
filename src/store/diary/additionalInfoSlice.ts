import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAdditionalInfoState {
  menus: {
    menu: string;
    price: number;
  }[];
  memo: string;
}

const initialState: IAdditionalInfoState = { menus: [{ menu: '', price: 0 }], memo: '' };

const additionalInfoSlice = createSlice({
  name: 'additionalInfo',
  initialState,
  reducers: {
    addAdditionalInfo: (state) => {
      state.menus.push({ menu: '', price: 0 });
    },
    setAdditionalInfo: (
      state,
      action: PayloadAction<{ idx: number; name: string; value: string }>,
    ) => {
      const { idx, name, value } = action.payload;
      const nextInfo = { ...state.menus[idx], [name]: value };
      state.menus[idx] = nextInfo;
    },
    removeAdditionalInfo: (state, action: PayloadAction<number>) => {
      state.menus = state.menus.filter((_, idx) => idx !== action.payload);
    },
    setMemo: (state, action: PayloadAction<string>) => {
      state.memo = action.payload;
    },
    clearAdditionalInfo: (state) => {
      state.memo = '';
      state.menus = [{ menu: '', price: 0 }];
    },
  },
});

export const {
  addAdditionalInfo,
  setAdditionalInfo,
  removeAdditionalInfo,
  setMemo,
  clearAdditionalInfo,
} = additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
