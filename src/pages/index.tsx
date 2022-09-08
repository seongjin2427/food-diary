import type { NextPage } from 'next';
import useModal from '../hooks/useModal';
import GlobalStyle from '../styles/global';

const Home: NextPage = () => {
  const [modalState, { openModal, closeModal }, Modal] = useModal();

  return (
    <>
      <GlobalStyle />
      <Modal modal={modalState} close={closeModal}>
        안녕하세요
      </Modal>
      <button onClick={openModal}>테스트</button>
    </>
  );
};

export default Home;
