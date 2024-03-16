import SearchDiary from '@/components/search/SearchDiary';
import CommonHeader from '@/layouts/CommonHeader';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';

const SearchDiaryPage: NextPage = () => {
  return (
    <>
      <Header
        title='음식일기 : 일기 검색'
        meta='작성했던 일기를 지정한 날짜 내에서 타이틀, 작성 내용에 대해 검색하여 보여줍니다.'
      >
        <CommonHeader type='prev' />
      </Header>
      <MainLayout>
        <SearchDiary />
      </MainLayout>
    </>
  );
};

export default SearchDiaryPage;
