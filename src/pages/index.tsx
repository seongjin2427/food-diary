import type { NextPage } from 'next';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/index';
import { userLogin } from '@/store/global';
import useReduxReset from '@/hooks/useReduxReset';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/layouts/HomeHeader';
import Calendar from '@/components/shared/Calendar';
import Login from '@/components/shared/Login';

const Home: NextPage = () => {
  const { isLogin } = useAppSelector(({ global }) => global);
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
          <Header>
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
