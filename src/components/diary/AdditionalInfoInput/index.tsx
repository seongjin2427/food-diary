import { ChangeEvent } from 'react';

import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './AdditionalInfoInput.styled';

interface AdditionalInfoInputProps {
  info: {
    idx: number;
    menu: string;
    price: number;
  };
  length: number;
  onChange: (e: ChangeEvent<HTMLInputElement>, idx: number) => void;
  addInfo: () => void;
  removeInfo: (idx: number) => void;
  readOnly?: boolean;
}

const AdditionalInfoInput = ({
  info,
  length,
  onChange,
  addInfo,
  removeInfo,
  readOnly,
}: AdditionalInfoInputProps) => {
  const { idx, menu, price } = info;

  return (
    <S.InfoInputsArea>
      <S.InfoDescriptionArea>
        <S.InfoDescriptionAreaInput
          name='menu'
          value={menu}
          onChange={(e) => onChange(e, idx)}
          readOnly={readOnly}
        />
      </S.InfoDescriptionArea>
      <S.InfoCostArea readOnly={readOnly}>
        <S.InfoCostInput
          type='number'
          max={8}
          maxLength={8}
          name='price'
          value={price}
          onChange={(e) => onChange(e, idx)}
          readOnly={readOnly}
        />
        <S.InfoCostWon>원</S.InfoCostWon>
      </S.InfoCostArea>
      <S.IconArea>
        {!readOnly && length - 1 === idx && (
          <SVGIcon icon='CirclePlusIcon' width='1.25rem' height='1.5rem' onClick={addInfo} />
        )}
        {!readOnly && length > 1 && idx !== length - 1 && (
          <SVGIcon
            icon='CircleMinusIcon'
            width='1.25rem'
            height='1.5rem'
            onClick={() => removeInfo(idx)}
            fill='red'
          />
        )}
      </S.IconArea>
    </S.InfoInputsArea>
  );
};

export default AdditionalInfoInput;
