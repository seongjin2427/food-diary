import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

import { EditorContext } from '@/components/shared/Editor/context/editorContext';
import { useAppSelector } from '@/store/index';
import Header from '@/layouts/Header';
import HomeHeader from '@/layouts/HomeHeader';
import MainLayout from '@/layouts/MainLayout';
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

  const { storeDiary } = useContext(EditorContext);

  return (
    <>
      <Header>
        <HomeHeader type='both' nextDisabled={true} nextUrl='/write/folder' nextFn={storeDiary} />
        {/* <HomeHeader type='next' nextDisabled={true} nextFn={storeDiary} /> */}
      </Header>
      {places.length === 0 && <MainLayout>선택된 장소가 없습니다.</MainLayout>}
      {places.length > 0 && (
        <MainLayout>
          <WriteDiary />
        </MainLayout>
      )}
    </>
  );
};

export default React.memo(DiaryPage);
