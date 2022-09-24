import Header from '@/layouts/Header';
import HomeHeader from '@/layouts/HomeHeader';
import MainLayout from '@/layouts/MainLayout';
import { useAppSelector } from '@/store/index';
import { NextPage } from 'next';
import React from 'react';

const FolderPage: NextPage = () => {
  const aa = useAppSelector((state) => state.diary);
  console.log('folder', aa);
  // const { content, date, images, places, thumbnail, title } = aa.post;

  return (
    <>
      <Header>
        <HomeHeader type='both' nextDisabled={true} />
      </Header>
      <MainLayout>
        folder 페이지 입니다
        {/* <>
          {content}
          <br />
          {date}
          <br />
          {images[0]}
          <br />
          {places[0]}
          <br />
          {thumbnail}
          <br />
          {title}
          <br />
        </> */}
      </MainLayout>
    </>
  );
};

export default FolderPage;
