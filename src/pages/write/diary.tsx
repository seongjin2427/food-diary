import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';

import { useAppSelector } from '@/store/index';
import { EditorContext } from '@/components/shared/Editor/context/editorContext';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import CommonHeader from '@/layouts/CommonHeader';
import WriteDiary from '@/components/shared/WriteDiary';

const DiaryPage: NextPage = () => {
  const router = useRouter();
  const { places, title, images } = useAppSelector(({ diary }) => diary);
  const { storeDiary } = useContext(EditorContext);

  const [nextPageToggle, setNextPageToggle] = useState<boolean>(false);

  useEffect(() => {
    if (places.length === 0) {
      router.replace('/');
      alert('선택된 장소가 없습니다.');
    }
  }, []);

  useEffect(() => {
    if (!!title && images.length > 0) {
      setNextPageToggle(true);
    } else {
      setNextPageToggle(false);
    }
  }, [title, images]);

  return (
    <>
      <Header>
        <CommonHeader
          type='both'
          nextDisabled={nextPageToggle}
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
