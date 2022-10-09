import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import useCalendar from '@/hooks/useCalendar';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './Calendar.styled';

function Calendar() {
  const router = useRouter();
  const [today, currentCalendar, startDay, setMonth] = useCalendar();

  const clickDay = useCallback(
    (date: string, image: string | undefined, did: number | null | undefined) => {
      if (!image) {
        const [year, month, day] = date.split('-');
        router.push(`/write/${day}/${month}/${year}`);
      } else {
        router.push(`/diary/${did}`);
      }
    },
    [],
  );

  const moveMonth = (n: number) => {
    setMonth(n);
  };

  return (
    <S.Container>
      <S.MonthArea>
        <S.CalendarButton onClick={() => moveMonth(-1)}>
          <SVGIcon icon='ChevronLeftIcon' width='2rem' height='2rem' />
        </S.CalendarButton>
        <S.Month>{dayjs(today).format('MMM YYYY')}</S.Month>
        <S.CalendarButton onClick={() => moveMonth(1)}>
          <SVGIcon icon='ChevronRightIcon' width='2rem' height='2rem' />
        </S.CalendarButton>
      </S.MonthArea>

      <S.DayArea>
        {currentCalendar.map(({ did, date, image }) => {
          return (
            <S.Day
              onClick={() => clickDay(date, image, did)}
              key={date.toString()}
              startDay={startDay}
            >
              {image ? (
                <S.Image src={image} />
              ) : (
                <S.Date today={dayjs(today).format('YYYY-MM-DD') === date}>
                  {date.split('-')[2]}
                </S.Date>
              )}
            </S.Day>
          );
        })}
      </S.DayArea>
    </S.Container>
  );
}

export default Calendar;
