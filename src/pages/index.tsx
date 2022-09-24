import type { NextPage } from 'next';
import { useEffect } from 'react';

import { useAppDispatch } from '@/store/index';
import { clearDiary } from '@/store/diary';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/layouts/HomeHeader';
import Calendar from '@/components/shared/Calendar';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearDiary());
  }, []);

  return (
    <>
      <Header>
        <HomeHeader type='home' />
      </Header>
      <MainLayout>
        <Calendar />
      </MainLayout>
    </>
  );
};

export default Home;
