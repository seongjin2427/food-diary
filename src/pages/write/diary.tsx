import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

import { useAppSelector } from '@/store/index';
import { EditorContext } from '@/components/shared/Editor/context/editorContext';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import WriteDiary from '@/components/shared/WriteDiary';
import CommonHeader from '@/layouts/CommonHeader';

const DiaryPage: NextPage = () => {
  const router = useRouter();
  const currentPost = useAppSelector(({ diary }) => diary.post);
  const { places } = currentPost;
  const { storeDiary, title, images } = useContext(EditorContext);

  useEffect(() => {
    if (places.length === 0) {
      router.replace('/');
      alert('선택된 장소가 없습니다.');
    }
  }, []);

  return (
    <>
      <Header>
        <CommonHeader
          type='both'
          nextDisabled={!!title && images.length !== 0}
          nextUrl='/write/folder'
          nextFn={storeDiary}
        />
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
