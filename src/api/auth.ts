import instance from './instance';
import { UserAttributes } from '@/db/models/user.model';

interface UserCheckResponseType {
  result: UserAttributes;
}

export const userCheck = async () => {
  try {
    const { data, headers } = await instance.get<UserCheckResponseType>(`/api/auth/check`);

    const token = headers['authorization'].split(' ')[1];
    localStorage.setItem('Authorization', token);

    return data.result;
  } catch (err) {
    console.log(err);
    alert('다시 로그인이 필요합니다!');
    return '';
  }
};

export const userLogoutApi = async () => {
  try {
    await instance.get('/api/auth/logout');
  } catch (err) {
    console.log(err);
  }
};

export const userWithDraw = async () => {
  try {
    await instance.get('/api/auth/withdraw');
  } catch (err) {
    console.log(err);
  }
};
