import PlaceDetail from '@/components/shared/PlaceDetail';
import CommonHeader from '@/layouts/CommonHeader';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';

interface PlacePageProps {
  axis: string;
}

const PlacePage: NextPage<PlacePageProps> = () => {
  return (
    <>
      <Header title='장소'>
        <CommonHeader type='prev' />
      </Header>
      <MainLayout>
        <PlaceDetail />
      </MainLayout>
    </>
  );
};

export default PlacePage;
