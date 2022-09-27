import { useState, useCallback, ChangeEvent } from 'react';

import AdditionalInfoInput from '@/components/shared/AdditionalInfoInput';
import * as S from './AdditionalInfo.styled';

interface AdditionalInfoType {
  menu: string;
  price: number;
}

const AdditinalInfo = () => {
  const [additionalMemo, setAdditionalMemo] = useState<string>('');
  const [additionalMenu, setAdditionalMenu] = useState<AdditionalInfoType[]>([
    { menu: '', price: 0 },
  ]);

  const onChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>, idx: number) => {
      setAdditionalMenu((prev) => {
        const arr = [...prev];
        arr[idx] = { ...arr[idx], [name]: value };
        return arr;
      });
    },
    [additionalMenu],
  );

  const addInfo = useCallback(() => {
    setAdditionalMenu((prev) => [...prev, { menu: '', price: 0 }]);
  }, []);

  const removeInfo = useCallback((idx: number) => {
    setAdditionalMenu((prev) => [...prev].filter((_, infoIdx) => infoIdx !== idx));
  }, []);

  const onChangeMemo = useCallback(({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalMemo(value);
  }, []);

  return (
    <S.Container>
      <S.Description>
        추가 정보를 기록하고 싶은 경우,
        <br /> 아래에 작성해주세요.
      </S.Description>
      <S.InfoContainer>
        <S.InfoArea>
          <S.InfoSubject>메뉴</S.InfoSubject>
          <S.InfoInputsContainer>
            {additionalMenu.map(({ menu, price }, idx) => (
              <AdditionalInfoInput
                key={idx}
                info={{ menu, price, idx }}
                onChange={onChange}
                addInfo={addInfo}
                removeInfo={removeInfo}
                length={additionalMenu.length}
              />
            ))}
          </S.InfoInputsContainer>
        </S.InfoArea>
        <S.InfoArea>
          <S.InfoSubject>메모</S.InfoSubject>
          <S.InfoMemoArea>
            <S.InfoTextarea onChange={onChangeMemo} value={additionalMemo} />
          </S.InfoMemoArea>
        </S.InfoArea>
      </S.InfoContainer>
    </S.Container>
  );
};

export default AdditinalInfo;
