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
  const { setSearchPrevDate, setSearchNextDate } = searchDiaryActions;

  return (
    <S.Container>
      <S.PeriodArea>
        <S.PeriodSubTitle>기간</S.PeriodSubTitle>
        <S.PeriodBox>
          <S.Period>
            <SVGIcon icon='CalendarIcon' width='1.25rem' height='1.25rem' />
            <SelectCalendar
              alignDirection='left'
              selectDate={prevDate}
              setSelectDate={setSearchPrevDate}
            />
          </S.Period>
          <SVGIcon icon='SubstractIcon' width='1.25rem' height='1.25rem' />
          <S.Period>
            <SVGIcon icon='CalendarIcon' width='1.25rem' height='1.25rem' />
            <SelectCalendar
              alignDirection='right'
              selectDate={nextDate}
              setSelectDate={setSearchNextDate}
            />
          </S.Period>
        </S.PeriodBox>
      </S.PeriodArea>
    </S.Container>
  );
};

export default SelectPeriod;
