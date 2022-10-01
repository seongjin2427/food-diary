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
  const [moveAbled, setMoveAbled] = useState<boolean>(false);

  const completeDiary = useCallback(async () => {
    console.log('a');

    const message = await uploadDiary({ diary, folder, additionalInfo });
    console.log('folder', message);
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
    const next = places.every((p) => !!folder.find((f) => f.places.find((pl) => pl.id === p.id)));
    setMoveAbled(next);
  });

  return (
    <>
      <Header>
        <CommonHeader
          type='both'
          nextDisabled={moveAbled}
          nextText='완료'
          nextFn={completeDiary}
          nextUrl='/write/folder'
        />
      </Header>
      <MainLayout>
        <FolderDiary />
      </MainLayout>
    </>
  );
};

export default FolderPage;
