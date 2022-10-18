import { userLoginApi, userLogoutApi, userWithDraw } from '@/api/auth';
import { kakaoInit } from '@/utils/kakaoInit';
import { useAppDispatch } from '@/store/index';
import { userLogin, userLogout } from '@/store/global';
import { useRouter } from 'next/router';

export interface TokenType {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
}

interface UserInformationType {
  connected_at: string;
  id: number;
  kakao_account: {
    age_range: string;
    birthday: string;
    email: string;
    gender: string;
  };
  properties: {
    nickname: string;
    profile_image: string;
  };
}

interface useUserInformationActions {
  login: () => void;
  logout: () => void;
  withdraw: () => void;
}

const useUserInformation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();

    // 카카오 로그인 진행
    kakao.Auth.login({
      success: (tokenData: TokenType) => {
        kakao.API.request({
          // 사용자 정보 가져오기 url
          url: '/v2/user/me',
          success: async (userData: UserInformationType) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push

            const userInfo = {
              nickname: userData.properties.nickname,
              email: userData.kakao_account.email,
              birthday: userData.kakao_account.birthday,
              gender: userData.kakao_account.gender,
            };

            const result = await userLoginApi(userInfo, tokenData);

            if (result) {
              localStorage.setItem('Authorization', result?.access_token);
              dispatch(userLogin());
            }
          },
          fail: (error: Error) => {
            console.log(error);
          },
        });
      },
      fail: (error: Error) => {
        console.log(error);
      },
    });
  };

  const logout = async () => {
    // 카카오 초기화
    if (confirm('로그아웃 하시겠습니까?')) {
      const kakao = kakaoInit();
      kakao.Auth.logout();
      localStorage.removeItem('Authorization');
      dispatch(userLogout());
      router.push('/');
      await userLogoutApi();
    }
  };
  
  const withdraw = async () => {
    if (confirm('정말 회원을 탈퇴하시겠습니까?')) {
      const kakao = kakaoInit();
      kakao.Auth.logout();
      localStorage.removeItem('Authorization');
      dispatch(userLogout());
      router.push('/');
      await userWithDraw();
    }
  };

  const actions: useUserInformationActions = {
    login,
    logout,
    withdraw
  };

  return [actions];
};

export default useUserInformation;
