import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

import { uploadDiary } from '@/api/diary';
import { useAppSelector } from '@/store/index';
import CommonHeader from '@/layouts/CommonHeader';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import FolderDiary from '@/components/shared/FolderDiary';

const FolderPage: NextPage = () => {
  const router = useRouter();
  const { diary, folder, additionalInfo } = useAppSelector((state) => state);
  const { folders } = folder;
  const [moveAbled, setMoveAbled] = useState<boolean>(false);

  const completeDiary = useCallback(async () => {
    await uploadDiary({ diary, folders, additionalInfo });
    alert('정상적으로 완료되었습니다');
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

  return (
    <>
      <Header title='음식일기 폴더 찾기'>
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
