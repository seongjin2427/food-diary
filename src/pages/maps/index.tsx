import Header from '@/layouts/Header';
import HomeHeader from '@/layouts/HomeHeader';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';

const MapsPage = () => {
  return (
    <>
      <Header>
        <HomeHeader type='map' />
      </Header>
      <MainLayout>MapsPage</MainLayout>
    </>
  );
};

export default MapsPage;
