import { getPlaceById } from '@/api/place';
import PlaceDetail from '@/components/shared/PlaceDetail';
import Spinner from '@/components/shared/Spinner';
import CommonHeader from '@/layouts/CommonHeader';
import Header from '@/layouts/Header';
import MainLayout from '@/layouts/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

interface PlacePageProps {
  pid: string;
}

const PlacePage: NextPage<PlacePageProps> = ({ pid }) => {
  const { data, isFetching } = useQuery(['folder', pid], () => getPlaceById(pid), {
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <Spinner color='lightcoral' size='2rem' speed='1' />;
  }
  if (!data) {
    return (
      <>
        <Header title='음식일기 : 장소 없음'>
          <CommonHeader type='prev' />
        </Header>
        <MainLayout>
          <div>해당 장소가 존재하지 않습니다.</div>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Header title='장소'>
        <CommonHeader type='prev' />
      </Header>
      <MainLayout>
        <PlaceDetail placeInformation={data} />
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { pid } = ctx.query;

  return {
    props: {
      pid,
    },
  };
};

export default PlacePage;
