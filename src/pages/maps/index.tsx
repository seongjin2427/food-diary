import React from 'react';

import Header from '@/layouts/Header';
import HomeHeader from '@/layouts/HomeHeader';
import MainLayout from '@/layouts/MainLayout';
import SearchMaps from '@/components/shared/SearchMaps';

const MapsPage = () => {
  return (
    <>
      <Header title='음식일기 : 장소 찾기'>
        <HomeHeader type='map' />
      </Header>
      <MainLayout>
        <SearchMaps />
      </MainLayout>
    </>
  );
};

export default MapsPage;
