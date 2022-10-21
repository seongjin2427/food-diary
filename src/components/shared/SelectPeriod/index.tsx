import React from 'react';

import { SearchDiaryActionType, SearchDiaryType } from '@/hooks/useSearchDiary';
import SVGIcon from '@/components/shared/SVGIcon';
import SelectCalendar from '@/components/shared/SelectCalendar';
import * as S from './SelectPeriod.styled';

import 'react-calendar/dist/Calendar.css';

interface SerachPeriodProps {
  searchDiaryStates: SearchDiaryType;
  searchDiaryActions: SearchDiaryActionType;
}
const SelectPeriod = ({ searchDiaryStates, searchDiaryActions }: SerachPeriodProps) => {
  const { prevDate, nextDate } = searchDiaryStates;
  const { setSelectDate } = searchDiaryActions;

  return (
    <S.Container>
      <S.PeriodArea>
        <S.PeriodSubTitle>기간</S.PeriodSubTitle>
        <S.PeriodBox>
          <S.Period>
            <SVGIcon icon='CalendarIcon' width='1.25rem' height='1.25rem' />
            <SelectCalendar
              type='prevDate'
              alignDirection='left'
              selectDate={prevDate}
              setSelectDate={setSelectDate}
            />
          </S.Period>
          <S.SubstractIcon>
            <SVGIcon icon='SubstractIcon' width='1.25rem' height='1.25rem' />
          </S.SubstractIcon>
          <S.Period>
            <SVGIcon icon='CalendarIcon' width='1.25rem' height='1.25rem' />
            <SelectCalendar
              type='nextDate'
              alignDirection='right'
              selectDate={nextDate}
              setSelectDate={setSelectDate}
            />
          </S.Period>
        </S.PeriodBox>
      </S.PeriodArea>
    </S.Container>
  );
};

export default SelectPeriod;
