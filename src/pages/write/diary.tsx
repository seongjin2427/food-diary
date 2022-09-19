import { NextPage } from 'next';
import React, { useEffect } from 'react';

import Header from '@/layouts/Header';
import HomeHeader from '@/layouts/HomeHeader';
import MainLayout from '@/layouts/MainLayout';
import { useAppSelector } from '@/store/index';
import { useRouter } from 'next/router';
import WriteDiary from '@/components/shared/WriteDiary';

const DiaryPage: NextPage = () => {
  const router = useRouter();
  const currentPost = useAppSelector(({ diary }) => diary.post);
  const { places } = currentPost;

  useEffect(() => {
    if (places.length === 0) {
      router.replace('/');
      alert('선택된 장소가 없습니다.');
    }
  }, []);

  return (
    <>
      <Header>
        <HomeHeader type='next' nextDisabled={true} />
      </Header>
      {places.length === 0 && <MainLayout>선택된 장소가 없습니다.</MainLayout>}
      {places.length > 0 && (
        <MainLayout>
          <WriteDiary />
        </MainLayout>
      )}
      <div id='footer' />
    </>
  );
};

export default DiaryPage;
