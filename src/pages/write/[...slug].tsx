import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import MainLayout from '@/layouts/MainLayout';
import Header from '@/layouts/Header';
import WriteDiaryBody from '@/components/shared/SearchPlaces';
import { useAppSelector } from '@/store/index';
import CommonHeader from '@/layouts/CommonHeader';

interface WriteDiaryProps {
  slug: string[];
}

const WriteDiary: NextPage<WriteDiaryProps> = ({ slug }) => {
  const [, month, year] = slug;
  const selectedPlaces = useAppSelector(({ diary }) => diary.post.places);

  if (12 < +month || 1950 > +year || +year > 2099) {
    return (
      <MainLayout>
        <h1>찾으시는 페이지가 존재하지 않습니다.</h1>
      </MainLayout>
    );
  }

  return (
    <>
      <Header>
        <CommonHeader
          type='next'
          nextUrl='/write/diary'
          nextDisabled={selectedPlaces.length !== 0}
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
