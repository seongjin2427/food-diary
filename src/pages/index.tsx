import { useEffect } from 'react';
import type { NextPage } from 'next';

import { userLogin } from '@/store/global';
import { useAppDispatch, useAppSelector } from '@/store/index';
import useReduxReset from '@/hooks/useReduxReset';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/layouts/HomeHeader';
import Calendar from '@/components/shared/Calendar';
import Login from '@/components/shared/Login';
import dayjs from 'dayjs';

const Home: NextPage = () => {
  const { isLogin, currentMonth } = useAppSelector(({ global }) => global);
  const dispatch = useAppDispatch();
  const reset = useReduxReset();

  useEffect(() => {
    reset();
  });

  useEffect(() => {
    const authKey = localStorage.getItem('Authorization');
    if (authKey) {
      dispatch(userLogin());
    }
  }, []);

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
          <MainLayout>
            <Login />
          </MainLayout>
        </>
      )}
    </>
  );
};

export default Home;
