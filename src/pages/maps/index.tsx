import React from 'react';

import Header from '@/layouts/Header';
import HomeHeader from '@/layouts/HomeHeader';
import MainLayout from '@/layouts/MainLayout';
import SearchMaps from '@/components/shared/maps/SearchMaps';

const MapsPage = () => {
  return (
    <>
      <Header
        title='음식일기 : 장소 찾기'
        meta='지도나 보유하고 있는 폴더 내의 장소를 검색할 수 있습니다!'
      >
        <HomeHeader type='map' />
      </Header>
      <MainLayout>
        <SearchMaps />
      </MainLayout>
    </>
  );
};

export default MapsPage;
