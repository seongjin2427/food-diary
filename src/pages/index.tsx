import type { NextPage } from 'next';

import GlobalStyle from '@/styles/global';

import instance from '@/api/instance';
import useModal from '@/hooks/useModal';
import useUserInformation from '@/hooks/useUserInformation';

const Home: NextPage = () => {
  const [modalState, { openModal, closeModal }, Modal] = useModal();
  const [actions] = useUserInformation();

  const kakaoLogin = async () => {
    actions.login();
  };

  const test = async () => {
    const res = await instance.get('/api/users');
    console.log(res);
  };

  return (
    <>
      <GlobalStyle />
      <Modal modal={modalState} close={closeModal}>
        안녕하세요
      </Modal>
      <button onClick={openModal}>테스트</button>

      <button onClick={kakaoLogin}>카카오 로그인</button>
      <button onClick={test}>유저 정보 확인</button>
    </>
  );
};

export default Home;
