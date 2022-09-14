import type { NextPage } from 'next';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/index';
import { clearPlace } from '@/store/diary';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/layouts/HomeHeader';
import Calendar from '@/components/shared/Calendar';

const Home: NextPage = () => {
  const places = useAppSelector(({ diary }) => diary.post.places);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (places.length > 0) dispatch(clearPlace());
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
