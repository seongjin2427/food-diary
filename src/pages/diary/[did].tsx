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

interface ReadDiaryPageProps {
  did: string;
}

const ReadDiaryPage: NextPage<ReadDiaryPageProps> = ({ did }) => {
  const dispatch = useAppDispatch();

  const { data } = useQuery(['DiaryByDid', did], () => getDiaryByDid(+did), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    onSuccess: (diaryData) => {
      if (diaryData) {
        dispatch(setDiary(diaryData.diary[0]));
        dispatch(setAllAdditionalInfo(diaryData.diary[0]));
      }
    },
  });

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

  const { date } = data.diary[0];
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
