import React from 'react';
import { NextPage } from 'next';

import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import CommonHeader from '@/layouts/CommonHeader';
import DiarySetting from '@/components/shared/DiarySetting';

const SettingPage: NextPage = () => {
  return (
    <>
      <Header
        title='음식일기 : 설정'
        meta='로그인 정보 및 로그아웃, 회원탈퇴를 할 수 있는 페이지 입니다!'
      >
        <CommonHeader type='prev' />
      </Header>
      <MainLayout>
        <DiarySetting />
      </MainLayout>
    </>
  );
};

export default SettingPage;
