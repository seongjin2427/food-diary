import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import MainLayout from '@/layouts/MainLayout';
import Header from '@/layouts/Header';
import HomeHeader from '@/components/shared/HomeHeader';
import WriteDiaryBody from '@/components/shared/WriteDiaryBody';

interface WriteDiaryProps {
  slug: string[];
}

const WriteDiary: NextPage<WriteDiaryProps> = ({ slug }) => {
  const [, month, year] = slug;

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
        <HomeHeader type='next' />
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
