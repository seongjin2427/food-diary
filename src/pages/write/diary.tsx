import { NextPage } from 'next';
import React from 'react';

import Header from '@/layouts/Header';
import HomeHeader from '@/layouts/HomeHeader';
import MainLayout from '@/layouts/MainLayout';
import { useAppSelector } from '@/store/index';

const DiaryPage: NextPage = () => {
  const selectedPlaces = useAppSelector(({ diary }) => diary.places);
  return (
    <>
      <Header>
        <HomeHeader type='next' nextDisabled={true} />
      </Header>
      <MainLayout>{selectedPlaces.length > 0 && selectedPlaces[0].id}</MainLayout>
    </>
  );
};

export default DiaryPage;
