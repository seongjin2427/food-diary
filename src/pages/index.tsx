import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useModal from '../hooks/useModal';
import GlobalStyle from '../styles/global';
import { kakaoInit } from '../util/kakaoInit';

const Home: NextPage = () => {
  const router = useRouter();
  const [modalState, { openModal, closeModal }, Modal] = useModal();

  const kakaoLogin = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();

    // 카카오 로그인 구현
    kakao.Auth.login({
      success: (res: any) => {
        console.log('res', res);
        kakao.API.request({
          url: '/v2/user/me', // 사용자 정보 가져오기
          success: (res: any) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
            console.log(res);
            router.push('/');
          },
          fail: (error: any) => {
            console.log(error);
          },
        });
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <GlobalStyle />
      <Modal modal={modalState} close={closeModal}>
        안녕하세요
      </Modal>
      <button onClick={openModal}>테스트</button>

      <button onClick={kakaoLogin}>가보자곳</button>
    </>
  );
};

export default Home;
