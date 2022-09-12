import { useRouter } from 'next/router';

import { userCheck, userLogin } from '@/api/auth';
import { kakaoInit } from '@/utils/kakaoInit';

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
}

const useUserInformation = () => {
  const router = useRouter();

  const login = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();

    // 카카오 로그인 진행
    kakao.Auth.login({
      success: (res: any) => {
        kakao.API.request({
          // 사용자 정보 가져오기 url
          url: '/v2/user/me',
          success: async (res: UserInformationType) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
            console.log(res);

            const result = await userCheck(res.kakao_account.email);

            if (!result) {
              const userInfo = {
                nickname: res.properties.nickname,
                email: res.kakao_account.email,
                birthday: res.kakao_account.birthday,
                gender: res.kakao_account.gender,
              };
              await userLogin(userInfo);
            }

            router.push('/');
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
    const kakao = kakaoInit();
    kakao.Auth.logout();
  };

  const actions: useUserInformationActions = {
    login,
    logout,
  };

  return [actions];
};

export default useUserInformation;
