import dayjs from 'dayjs';
import { useEffect } from 'react';
import type { NextPage } from 'next';

import { userLogin } from '@/store/global';
import { useAppDispatch, useAppSelector } from '@/store/index';
import useReduxReset from '@/hooks/useReduxReset';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/layouts/HomeHeader';
import Login from '@/components/shared/Login';
import Calendar from '@/components/shared/Calendar';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isLogin, currentMonth } = useAppSelector(({ global }) => global);
  const reset = useReduxReset();

  useEffect(() => {
    reset();
  });

  useEffect(() => {
    if (!isLogin) {
      const authKey = localStorage.getItem('Authorization');
      if (authKey) dispatch(userLogin());
    }
  }, [isLogin]);

  return (
    <>
      {isLogin && (
        <>
          <Header
            title={`음식일기 : 캘린더 ${dayjs(currentMonth).format('MM')}월`}
            meta='로그인 후 서비스 이용이 가능합니다.'
          >
            <HomeHeader type='home' />
          </Header>
          <MainLayout>
            <Calendar />
          </MainLayout>
        </>
      )}
      {!isLogin && (
        <>
          <Header
            title={'음식일기 : 어디서 먹었지?'}
            meta='월별로 일기를 작성하거나 이미 작성한 일기를 볼 수 있습니다.'
          />
          <MainLayout>
            <Login />
          </MainLayout>
        </>
      )}
    </>
  );
};

export default Home;
