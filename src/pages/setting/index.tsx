import React from 'react';
import { NextPage } from 'next';

import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import CommonHeader from '@/layouts/CommonHeader';
import DiarySetting from '@/components/shared/DiarySetting';

const SettingPage: NextPage = () => {
  return (
    <>
      <Header>
        <CommonHeader type='prev' />
      </Header>
      <MainLayout>
        <DiarySetting />
      </MainLayout>
    </>
  );
};

export default SettingPage;
