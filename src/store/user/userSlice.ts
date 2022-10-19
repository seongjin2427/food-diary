import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  nickname: string;
  email: string;
  birthday: string | undefined;
  gender: string;
}

const initialState: IUserState = {
  nickname: '',
  email: '',
  birthday: '',
  gender: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      const { nickname, email, birthday, gender } = action.payload;
      state.nickname = nickname;
      state.email = email;
      state.birthday = birthday;
      state.gender = gender;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
