import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import useCalendar from '@/hooks/useCalendar';
import * as S from './Calendar.styled';
import { useAppSelector } from '@/store/index';

function Calendar() {
  const router = useRouter();
  const [today, currentMonth, startDay] = useCalendar();

  const {
    folder: { folders },
  } = useAppSelector((state) => state);

  useEffect(() => {
    console.log(folders[1]);
  }, [folders]);

  const clickDay = useCallback((date: Date) => {
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
            <S.Date today={today === val}>
              {val.toLocaleDateString('en-US', { day: '2-digit' })}
            </S.Date>
          </S.Day>
        ))}
      </S.DayArea>
    </S.Container>
  );
}

export default Calendar;
