import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  isLogin: boolean;
  diaryModifyMode: boolean;
  today: string;
  currentMonth: string;
};

const today = new Date();

const initialState: SliceState = {
  isLogin: false,
  diaryModifyMode: false,
  today: today.toString(),
  currentMonth: today.toString(),
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
    changeCurrentMonth: (state, action: PayloadAction<string>) => {
      state.currentMonth = action.payload;
    },
    setOnToday: (state, action: PayloadAction<string>) => {
      state.today = action.payload;
    },
  },
});

export const {
  userLogin,
  userLogout,
  onDiaryModifyMode,
  offDiaryModifyMode,
  changeCurrentMonth,
  setOnToday,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
