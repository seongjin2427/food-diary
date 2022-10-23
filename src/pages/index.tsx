import dayjs from 'dayjs';
import { useEffect } from 'react';
import type { NextPage } from 'next';

import { useAppSelector } from '@/store/index';
import useReduxReset from '@/hooks/useReduxReset';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/layouts/HomeHeader';
import Login from '@/components/shared/Login';
import Calendar from '@/components/shared/Calendar';

const Home: NextPage = () => {
  const { isLogin, currentMonth } = useAppSelector(({ global }) => global);
  const reset = useReduxReset();

  useEffect(() => {
    reset();
  });

  return (
    <>
      {isLogin && (
        <>
          <Header title={`음식일기 : 캘린더 ${dayjs(currentMonth).format('MM')}월`}>
            <HomeHeader type='home' />
          </Header>
          <MainLayout>
            <Calendar />
          </MainLayout>
        </>
      )}
      {!isLogin && (
        <>
          <Header title={'음식일기 : 어디서 먹었지?'} />
          <MainLayout>
            <Login />
          </MainLayout>
        </>
      )}
    </>
  );
};

export default Home;
