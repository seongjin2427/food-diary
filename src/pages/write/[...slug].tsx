import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import MainLayout from '@/layouts/MainLayout';
import Header from '@/layouts/Header';
import WriteDiaryBody from '@/components/shared/SearchPlaces';
import { useAppDispatch, useAppSelector } from '@/store/index';
import CommonHeader from '@/layouts/CommonHeader';
import { onDiaryModifyMode } from '@/store/global';

interface WriteDiaryProps {
  slug: string[];
}

const WriteDiary: NextPage<WriteDiaryProps> = ({ slug }) => {
  const [, month, year] = slug;
  const selectedPlaces = useAppSelector(({ diary }) => diary.places);
  const dispatch = useAppDispatch();

  if (12 < +month || 1950 > +year || +year > 2099) {
    return (
      <MainLayout>
        <h1>찾으시는 페이지가 존재하지 않습니다.</h1>
      </MainLayout>
    );
  }

  return (
    <>
      <Header
        title='음식일기 장소 찾기'
        meta='일기를 작성하기 위해 저장하기 위한 특정 장소를 검색합니다.'
      >
        <CommonHeader
          type='next'
          nextUrl='/write/diary'
          nextDisabled={selectedPlaces.length !== 0}
          nextFn={() => dispatch(onDiaryModifyMode())}
        />
      </Header>
      <MainLayout>
        <WriteDiaryBody slug={slug} />
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  return {
    props: {
      slug,
    },
  };
};

export default WriteDiary;
