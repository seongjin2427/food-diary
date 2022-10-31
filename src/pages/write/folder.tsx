import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';

import { uploadDiary } from '@/api/diary';
import { useAppSelector } from '@/store/index';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import CommonHeader from '@/layouts/CommonHeader';
import Spinner from '@/components/shared/Spinner';
import FolderDiary from '@/components/shared/FolderDiary';

const FolderPage: NextPage = () => {
  const router = useRouter();
  const { diary, folder, additionalInfo } = useAppSelector((state) => state);
  const { folders } = folder;
  const [moveAbled, setMoveAbled] = useState<boolean>(false);

  const { isLoading, mutate } = useMutation(uploadDiary, {
    onSuccess() {
      router.push('/');
      alert('정상적으로 완료되었습니다');
    },
  });

  const completeDiary = useCallback(async () => {
    mutate({ diary, folders, additionalInfo });
  }, [diary, folder, additionalInfo]);

  useEffect(() => {
    const places = diary.places.length;
    if (!places) {
      alert('메인 페이지로 돌아갑니다.');
      router.push('/');
    }
  }, []);

  useEffect(() => {
    const places = diary.places;
    const next = places.every((p) => !!folders.find((f) => f.places.find((pl) => pl.id === p.id)));
    setMoveAbled(next);
  });

  if (isLoading) {
    return <Spinner color='lightcoral' size='2rem' speed='1' />;
  }

  return (
    <>
      <Header
        title='음식일기: 장소 폴더 지정하기'
        meta='장소를 저장할 폴더를 지정하고 메뉴와 가격에 대한 추가 정보를 입력할 수 있습니다'
      >
        <CommonHeader
          type='both'
          nextUrl='/'
          nextText='완료'
          nextDisabled={moveAbled}
          nextFn={completeDiary}
        />
      </Header>
      <MainLayout>
        <FolderDiary />
      </MainLayout>
    </>
  );
};

export default FolderPage;
