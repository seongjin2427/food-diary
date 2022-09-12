import instance from './instance';

interface UserInformationType {
  nickname: string;
  email: string;
  birthday: string;
  gender: string;
}

export const userCheck = async (email: string) => {
  try {
    const { data } = await instance.post('/api/auth/check', { email });
    return data.result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const userLogin = async (userInfo: UserInformationType) => {
  try {
    const { data } = await instance.post('/api/auth/login', { userInfo });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
