import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAppSelector } from '@/store/index';
import Header from '@/layouts/Header';
import HomeHeader from '@/layouts/HomeHeader';
import MainLayout from '@/layouts/MainLayout';
import WriteDiary from '@/components/shared/WriteDiary';
import EditorProvider from '@/components/shared/Editor/context/editorContext';

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
    <EditorProvider>
      <Header>
        <HomeHeader type='next' nextDisabled={true} />
      </Header>
      {places.length === 0 && <MainLayout>선택된 장소가 없습니다.</MainLayout>}
      {places.length > 0 && (
        <MainLayout>
          <WriteDiary />
        </MainLayout>
      )}
    </EditorProvider>
  );
};

export default DiaryPage;
