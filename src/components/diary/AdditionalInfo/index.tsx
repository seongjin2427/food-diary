import { useCallback, ChangeEvent } from 'react';

import {
  addAdditionalInfo,
  removeAdditionalInfo,
  setAdditionalInfo,
  setMemo,
} from '@/store/diary/additionalInfoSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import AdditionalInfoInput from '@/components/diary/AdditionalInfoInput';
import * as S from './AdditionalInfo.styled';

interface AdditionalInfoProps {
  readOnly?: boolean;
}

const AdditinalInfo = ({ readOnly }: AdditionalInfoProps) => {
  const dispatch = useAppDispatch();
  const { menus, memo } = useAppSelector(({ additionalInfo }) => additionalInfo);

  const onChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>, idx: number) => {
      dispatch(setAdditionalInfo({ idx, name, value }));
    },
    [menus],
  );

  const addInfo = useCallback(() => {
    dispatch(addAdditionalInfo());
  }, []);

  const removeInfo = useCallback((idx: number) => {
    dispatch(removeAdditionalInfo(idx));
  }, []);

  const onChangeMemo = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setMemo(value));
    },
    [memo],
  );

  return (
    <S.Container>
      {readOnly ? (
        <S.Description>작성했던 메모</S.Description>
      ) : (
        <S.Description>
          추가 정보에 대해서 <br /> 아래에 작성해주세요.
        </S.Description>
      )}
      <S.InfoContainer>
        <S.InfoArea>
          <S.InfoSubject>메뉴</S.InfoSubject>
          <S.InfoInputsContainer>
            {menus.map(({ menu, price }, idx) => (
              <AdditionalInfoInput
                key={idx}
                info={{ menu, price, idx }}
                onChange={onChange}
                addInfo={addInfo}
                removeInfo={removeInfo}
                length={menus.length}
                readOnly={readOnly}
              />
            ))}
          </S.InfoInputsContainer>
        </S.InfoArea>
        <S.InfoArea>
          <S.InfoSubject>메모</S.InfoSubject>
          <S.InfoMemoArea>
            <S.InfoTextarea onChange={onChangeMemo} value={memo} readOnly={readOnly} />
          </S.InfoMemoArea>
        </S.InfoArea>
      </S.InfoContainer>
    </S.Container>
  );
};

export default AdditinalInfo;
