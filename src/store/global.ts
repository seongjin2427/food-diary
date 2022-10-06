import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  isLogin: boolean;
  diaryModifyMode: boolean;
};

const initialState: SliceState = {
  isLogin: false,
  diaryModifyMode: false,
};

const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    userLogin: (state) => {
      state.isLogin = true;
    },
    userLogout: (state) => {
      state.isLogin = false;
    },
    onDiaryModifyMode: (state) => {
      state.diaryModifyMode = true;
    },
    offDiaryModifyMode: (state) => {
      state.diaryModifyMode = false;
    },
  },
});

export const { userLogin, userLogout, onDiaryModifyMode, offDiaryModifyMode } = GlobalSlice.actions;

export default GlobalSlice.reducer;
