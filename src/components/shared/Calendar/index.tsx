import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import useCalendar from '@/hooks/useCalendar';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './Calendar.styled';

function Calendar() {
  const router = useRouter();
  const [today, currentCalendar, startDay, setMonth] = useCalendar();

  const clickDay = useCallback((date: Date) => {
    router.push(
      `/write/${date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })}`,
    );
  }, []);

  const moveMonth = (n: number) => {
    setMonth(n);
  };

  return (
    <S.Container>
      <S.MonthArea>
        <S.CalendarButton onClick={() => moveMonth(-1)}>
          <SVGIcon icon='ChevronLeftIcon' width='2rem' height='2rem' />
        </S.CalendarButton>
        <S.Month>
          {today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })}
        </S.Month>
        <S.CalendarButton onClick={() => moveMonth(1)}>
          <SVGIcon icon='ChevronRightIcon' width='2rem' height='2rem' />
        </S.CalendarButton>
      </S.MonthArea>

      <S.DayArea>
        {currentCalendar.map((date) => {
          return (
            <S.Day onClick={() => clickDay(date)} key={date.toString()} startDay={startDay}>
              <S.Date today={today === date}>
                {date.toLocaleDateString('en-US', { day: '2-digit' })}
              </S.Date>
            </S.Day>
          );
        })}
      </S.DayArea>
    </S.Container>
  );
}

export default Calendar;
