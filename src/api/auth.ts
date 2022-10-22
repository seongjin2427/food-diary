import instance from './instance';
import { UserAttributes } from '@/db/models/user.model';
import { TokenType } from '@/hooks/useUserInformation';

interface UserInformationType {
  nickname: string;
  email: string;
  birthday: string;
  gender: string;
}

interface UserCheckResponseType {
  result: UserAttributes;
}

export const userCheck = async (token: string | null) => {
  try {
    const { data } = await instance.get<UserCheckResponseType>(`/api/auth/check?token=${token}`);
    return data.result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const userLoginApi = async (userData: UserInformationType, token: TokenType) => {
  try {
    const { data } = await instance.post<UserCheckResponseType>('/api/auth/login', {
      userData,
      token,
    });
    return data.result;
  } catch (err) {
    return null;
  }
};

export const userLogoutApi = async () => {
  try {
    const { data } = await instance.get('/api/auth/logout');
  } catch (err) {
    console.log(err);
  }
};

export const userWithDraw = async () => {
  try {
    const { data } = await instance.get('/api/auth/withdraw');
  } catch (err) {
    console.log(err);
  }
};
