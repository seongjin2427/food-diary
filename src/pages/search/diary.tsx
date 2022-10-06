import SearchDiary from '@/components/shared/SearchDiary';
import CommonHeader from '@/layouts/CommonHeader';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';

const SearchDiaryPage: NextPage = () => {
  return (
    <>
      <Header>
        <CommonHeader type='prev' />
      </Header>
      <MainLayout>
        <SearchDiary />
      </MainLayout>
    </>
  );
};

export default SearchDiaryPage;
