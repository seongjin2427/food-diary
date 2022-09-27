import { NextPage } from 'next';
import React from 'react';

import { useAppSelector } from '@/store/index';
import CommonHeader from '@/layouts/CommonHeader';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import FolderDiary from '@/components/shared/FolderDiary';

const FolderPage: NextPage = () => {
  const aa = useAppSelector((state) => state.diary);
  console.log('folder', aa);

  return (
    <>
      <Header>
        <CommonHeader type='both' nextDisabled={true} nextText='완료' />
      </Header>
      <MainLayout>
        <FolderDiary />
      </MainLayout>
    </>
  );
};

export default FolderPage;
