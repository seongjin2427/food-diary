import type { NextPage } from 'next';
import { useEffect } from 'react';

import { clearDiary } from '@/store/diary/diarySlice';
import { clearAdditionalInfo } from '@/store/diary/additionalInfoSlice';
import { clearFolder } from '@/store/diary/folderSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { userLogin } from '@/store/global';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/layouts/HomeHeader';
import Calendar from '@/components/shared/Calendar';
import Login from '@/components/shared/Login';

const Home: NextPage = () => {
  const { isLogin } = useAppSelector(({ global }) => global);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearDiary());
    dispatch(clearAdditionalInfo());
    dispatch(clearFolder());
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
