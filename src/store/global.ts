import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
  isLogin: boolean;
};

const initialState: SliceState = {
  isLogin: false,
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
  },
});

export const { userLogin, userLogout } = GlobalSlice.actions;

export default GlobalSlice.reducer;
