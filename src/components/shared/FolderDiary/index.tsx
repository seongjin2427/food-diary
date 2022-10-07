import React, { useEffect } from 'react';

import { useAppSelector } from '@/store/index';
import SVGIcon from '@/components/shared/SVGIcon';
import FolderSelect from '@/components/shared/FolderSelect';
import AdditinalInfo from '@/components/shared/AdditionalInfo';
import * as S from './FolderDiary.styled';

const FolderDiary = () => {
  const { places } = useAppSelector(({ diary }) => diary);
  const { folders } = useAppSelector(({ folder }) => folder);

  useEffect(() => {
    console.log(folders);
  }, [folders]);

  return (
    <S.Container>
      <S.FolderContainer>
        <S.Title>어디에 저장할까요?</S.Title>
        <S.FolderTagArea>
          {places.map((place) => (
            <S.FolderArea key={place.address_name}>
              <S.TagBox>
                <SVGIcon icon='MapPinIcon' width='1rem' height='1rem' />
                <S.Tag>{place.place_name}</S.Tag>
              </S.TagBox>
              <S.FolderSelectArea>
                <FolderSelect place={place} />
              </S.FolderSelectArea>
            </S.FolderArea>
          ))}
        </S.FolderTagArea>
      </S.FolderContainer>
      <S.AdditionalInfoContainer>
        <AdditinalInfo />
      </S.AdditionalInfoContainer>
    </S.Container>
  );
};

export default FolderDiary;
