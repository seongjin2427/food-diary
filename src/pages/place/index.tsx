import React from 'react';
import { NextPage } from 'next';

import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import PlaceDetail from '@/components/shared/PlaceDetail';
import CommonHeader from '@/layouts/CommonHeader';
import { useAppSelector } from '@/store/index';

interface PlacePageProps {
  axis: string;
}

const PlacePage: NextPage<PlacePageProps> = () => {
  const { place } = useAppSelector(({ place }) => place);

  return (
    <>
      <Header title={`장소: ${place?.place_name}`}>
        <CommonHeader type='prev' />
      </Header>
      <MainLayout>
        <PlaceDetail />
      </MainLayout>
    </>
  );
};

export default PlacePage;
