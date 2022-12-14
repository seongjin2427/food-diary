import { AxiosError } from 'axios';

import instance from './instance';
import { UserAttributes } from '@/db/models/user.model';

interface UserCheckResponseType {
  result: UserAttributes;
}

export const userCheck = async () => {
  try {
    const { data, headers } = await instance.get<UserCheckResponseType>(`/api/auth/check`);

    const token = headers['authorization'].split(' ')[1] || '';
    localStorage.setItem('Authorization', token);

    return data.result;
  } catch (err) {
    const error = err as AxiosError;
    return error.response?.status;
  }
};

export const userLogoutApi = async () => {
  try {
    const { data } = await instance.get('/api/auth/logout');
    console.log(data);
    return data.message;
  } catch (err) {
    console.log(err);
  }
};

export const userWithDraw = async () => {
  try {
    const { data } = await instance.get('/api/auth/withdraw');
    console.log(data);
    return data.message;
  } catch (err) {
    console.log(err);
  }
};
