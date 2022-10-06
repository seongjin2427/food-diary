import { NextPage, NextPageContext } from 'next';
import React from 'react';

import CommonHeader from '@/layouts/CommonHeader';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { getDiaryByDid } from '@/api/diary';
import ReadDiary from '@/components/shared/ReadDiary';
import { useAppDispatch } from '@/store/index';
import { setDiary } from '@/store/diary/diarySlice';
import { setAllAdditionalInfo } from '@/store/diary/additionalInfoSlice';
import dayjs from 'dayjs';
import Spinner from '@/components/shared/Spinner';

interface ReadDiaryPageProps {
  did: string;
}

const ReadDiaryPage: NextPage<ReadDiaryPageProps> = ({ did }) => {
  const dispatch = useAppDispatch();

  const { data, isFetching } = useQuery(['DiaryByDid', did], () => getDiaryByDid(+did), {
    refetchOnWindowFocus: false,
    onSuccess: (diaryData) => {
      if (diaryData) {
        dispatch(setDiary(diaryData));
        dispatch(setAllAdditionalInfo(diaryData));
      }
    },
  });

  if (isFetching) {
    return <Spinner color='lightcoral' size='2rem' speed='1' />;
  }

  if (!data) {
    return (
      <>
        <Header>
          <CommonHeader type='prev' />
        </Header>
        <MainLayout>
          <div>해당 일기가 존재하지 않습니다.</div>
        </MainLayout>
      </>
    );
  }

  const { date } = data;
  const [year, month, day] = dayjs(date).format('YYYY-MM-DD').split('-');

  return (
    <>
      <Header>
        <CommonHeader type='read-diary' nextUrl={`/write/${day}/${month}/${year}`} nextDisabled />
      </Header>
      <MainLayout>
        <ReadDiary />
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { did } = ctx.query;

  return {
    props: {
      did,
    },
  };
};

export default ReadDiaryPage;
