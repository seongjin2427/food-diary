import type { NextPage } from 'next';

import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import HomeHeader from '@/components/shared/HomeHeader';

const Home: NextPage = () => {
  return (
    <>
      <Header>
        <HomeHeader />
      </Header>
      <MainLayout>MainLayout</MainLayout>
    </>
  );
};

export default Home;
