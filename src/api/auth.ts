import { UserAttributes } from '@/db/models/user.model';
import { TokenType } from '@/hooks/useUserInformation';
import instance from './instance';

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
    console.log(data);
    return data.result;
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    console.log(e);
    return null;
  }
};
