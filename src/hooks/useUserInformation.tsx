import { useRouter } from 'next/router';

import { userLogout } from '@/store/global';
import { useAppDispatch } from '@/store/index';
import { userLogoutApi, userWithDraw } from '@/api/auth';
import { useQueryClient } from '@tanstack/react-query';

interface useUserInformationActions {
  login: () => void;
  logout: () => void;
  withdraw: () => void;
}

const useUserInformation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const login = async () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=profile_nickname,account_email,birthday,gender`,
    );
  };

  const logout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      const data = await queryClient.fetchQuery(['logout'], userLogoutApi);
      console.log('data', data);
      if (data) {
        localStorage.removeItem('Authorization');
        dispatch(userLogout());
        alert('로그아웃 되었습니다!');
        router.push('/');
      }
    }
  };

  const withdraw = async () => {
    if (confirm('정말 회원을 탈퇴하시겠습니까?')) {
      const data = await queryClient.fetchQuery(['withDraw'], userWithDraw);
      if (data) {
        localStorage.removeItem('Authorization');
        dispatch(userLogout());
        alert('정상적으로 탈퇴 되었습니다!\n이용해주셔서 감사합니다!');
        router.push('/');
      }
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
