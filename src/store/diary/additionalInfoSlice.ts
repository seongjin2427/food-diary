import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAdditionalInfoState {
  menu: string;
  price: number;
}

const initialState: IAdditionalInfoState[] = [{ menu: '', price: 0 }];

const additionalInfoSlice = createSlice({
  name: 'additionalInfo',
  initialState,
  reducers: {
    addAdditionalInfo: (state) => {
      state.push({ menu: '', price: 0 });
    },
    setAdditionalInfo: (
      state,
      action: PayloadAction<{ idx: number; name: string; value: string }>,
    ) => {
      const { idx, name, value } = action.payload;
      const nextInfo = { ...state[idx], [name]: value };
      state[idx] = nextInfo;
    },
  },
});

export const { addAdditionalInfo, setAdditionalInfo } = additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
