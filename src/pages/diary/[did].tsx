import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getDiaryByDid, removeDiaryBydid } from '@/api/diary';
import { setDiary } from '@/store/diary/diarySlice';
import { useAppDispatch } from '@/store/index';
import { setAllAdditionalInfo } from '@/store/diary/additionalInfoSlice';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import CommonHeader from '@/layouts/CommonHeader';
import Spinner from '@/components/shared/Spinner';
import ReadDiary from '@/components/shared/diary/ReadDiary';
import { offDiaryModifyMode } from '@/store/global';

interface ReadDiaryPageProps {
  did: string;
}

const ReadDiaryPage: NextPage<ReadDiaryPageProps> = ({ did }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(offDiaryModifyMode());
  }, []);

  const { data, isFetching } = useQuery(['DiaryByDid', did], () => getDiaryByDid(did), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    onSuccess: (diaryData) => {
      if (diaryData) {
        dispatch(setDiary(diaryData));
        dispatch(setAllAdditionalInfo(diaryData));
      }
    },
  });

  const { isLoading, mutate } = useMutation(removeDiaryBydid, {
    onSuccess() {
      router.replace('/');
      alert('정상적으로 삭제되었습니다!');
    },
  });

  const removeDiary = useCallback(() => {
    if (confirm('이 다이어리를 정말 삭제하시겠습니까?')) {
      mutate(did);
    }
  }, []);

  if (isFetching || isLoading) {
    return <Spinner color='lightcoral' size='2rem' speed='1' />;
  }

  if (!data) {
    return (
      <>
        <Header title='음식일기 : 일기 없음' meta='해당 일기가 존재하지 않습니다.'>
          <CommonHeader type='prev' />
        </Header>
        <MainLayout>
          <div>해당 일기가 존재하지 않습니다.</div>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Header title='음식일기 : 일기 읽기' meta={`음식일기 - ${data.title}`}>
        <CommonHeader
          type='read-diary'
          nextUrl={`/write/diary`}
          removeFn={removeDiary}
          nextDisabled
        />
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
