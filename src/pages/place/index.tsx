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
      <Header
        title={`장소: ${place?.place_name}`}
        meta='장소에 대한 세부 내용을 확인하고 해당 장소를 폴더에 저장하거나 폴더에서 삭제할 수 있습니다!'
      >
        <CommonHeader type='prev' />
      </Header>
      <MainLayout>
        <PlaceDetail />
      </MainLayout>
    </>
  );
};

export default PlacePage;
