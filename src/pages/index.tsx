import type { NextPage } from 'next';

import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/components/shared/HomeHeader';
import Calendar from '@/components/shared/Calendar';

const Home: NextPage = () => {
  return (
    <>
      <Header>
        <HomeHeader type='home' />
      </Header>
      <MainLayout>
        <Calendar />
      </MainLayout>
    </>
  );
};

export default Home;
