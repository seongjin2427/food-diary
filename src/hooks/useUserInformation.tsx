import { useRouter } from 'next/router';

import { userLogout } from '@/store/global';
import { useAppDispatch } from '@/store/index';
import { userLogoutApi, userWithDraw } from '@/api/auth';

interface useUserInformationActions {
  login: () => void;
  logout: () => void;
  withdraw: () => void;
}

const useUserInformation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = async () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=profile_nickname,account_email,birthday,gender`,
    );
  };

  const logout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      await userLogoutApi();
      localStorage.removeItem('Authorization');
      dispatch(userLogout());
      setTimeout(() => router.push('/'), 1000);
      alert('정상적으로 로그아웃 되었습니다!');
    }
  };

  const withdraw = async () => {
    if (confirm('정말 회원을 탈퇴하시겠습니까?')) {
      await userWithDraw();
      localStorage.removeItem('Authorization');
      dispatch(userLogout());
      setTimeout(() => router.push('/'), 1000);
    }
  };

  const actions: useUserInformationActions = {
    login,
    logout,
    withdraw,
  };

  return [actions];
};

export default useUserInformation;
