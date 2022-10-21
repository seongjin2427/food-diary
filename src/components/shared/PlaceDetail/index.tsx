import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { getPlaceById } from '@/api/place';
import { useAppSelector } from '@/store/index';
import PlaceMap from '@/components/shared/PlaceMap';
import Spinner from '@/components/shared/Spinner';
import SVGIcon from '@/components/shared/SVGIcon';
import PlaceFolderSelect from '@/components/shared/PlaceFolderSelect';
import * as S from './PlaceDetail.styled';

const PlaceDetail = () => {
  const router = useRouter();
  const { place: pi } = useAppSelector(({ place }) => place);
  const [toggle, setToggle] = useState<boolean>(false);

  const onClickOnToggle = () => {
    setToggle(!toggle);
  };

  const onClickMoveDiary = (did: number) => {
    router.push(`/diary/${did}`);
  };

  if (!pi) {
    return <S.Container>해당 장소가 존재하지 않습니다.</S.Container>;
  }

  const { data, isFetching } = useQuery(['folder', pi.id], () => getPlaceById(pi.id), {
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <Spinner color='lightcoral' size='2rem' speed='1' />;
  }

  return (
    <S.Container>
      <S.PlaceName>{pi.place_name}</S.PlaceName>
      <S.FolderIconList>
        <PlaceFolderSelect place={pi} />
      </S.FolderIconList>
      <S.InformationBox>
        <S.InformationParagraph>{pi.address_name}</S.InformationParagraph>
        <S.InformationParagraph>{pi.category_name}</S.InformationParagraph>
        <S.InformationParagraph>{pi.phone}</S.InformationParagraph>
      </S.InformationBox>

      <S.ArcodianBox>
        <S.InformationBox>
          <S.ArcodianTitle onClick={onClickOnToggle}>
            방문 기록
            <SVGIcon icon='ChevronDownIcon' width='1.25rem' height='1.25rem' />
          </S.ArcodianTitle>
        </S.InformationBox>
        <S.VistiedList toggle={toggle}>
          {data?.diaries.map(({ did, title, date }) => (
            <S.VisitedItem key={date} onClick={() => onClickMoveDiary(did)}>
              {title}
              <S.SmallText>{dayjs(date).format('YYYY/MM/DD')}</S.SmallText>
            </S.VisitedItem>
          ))}
        </S.VistiedList>
      </S.ArcodianBox>

      <PlaceMap x={pi.x} y={pi.y} />

      <S.InformationBox>
        <S.KakaoMapLink href={pi.place_url}>{pi.place_url}</S.KakaoMapLink>
        <S.Distance>거리 {+pi.distance / 1000}km</S.Distance>
      </S.InformationBox>
    </S.Container>
  );
};

export default PlaceDetail;
