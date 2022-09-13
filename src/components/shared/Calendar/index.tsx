import React, { useCallback } from 'react';

import useCalendar from '@/hooks/useCalendar';
import * as S from './Calendar.styled';
import { useRouter } from 'next/router';

function Calendar() {
  const router = useRouter();
  const [today, currentMonth, startDay] = useCalendar();

  const clickDay = useCallback((date: Date) => {
    console.log(
      // date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }),
      date.toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' }),
    );

    router.push(
      `/write/${date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })}`,
    );
  }, []);

  return (
    <S.Container>
      <S.MonthArea>
        <S.Month>
          {today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })}
        </S.Month>
      </S.MonthArea>
      <S.DayArea>
        {currentMonth.map((val) => (
          <S.Day onClick={() => clickDay(val)} key={val.toString()} startDay={startDay}>
            {val.toLocaleDateString('en-US', { day: '2-digit' })}
          </S.Day>
        ))}
      </S.DayArea>
    </S.Container>
  );
}

export default Calendar;
