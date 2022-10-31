import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import { useAppSelector } from '@/store/index';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import CommonHeader from '@/layouts/CommonHeader';
import WriteDiary from '@/components/shared/WriteDiary';

const DiaryPage: NextPage = () => {
  const router = useRouter();
  const { places, title, images } = useAppSelector(({ diary }) => diary);

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
      <Header title='음식일기 일기 작성' meta='사진과 함께 일기를 작성합니다'>
        <CommonHeader type='both' nextDisabled={nextPageToggle} nextUrl='/write/folder' />
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
