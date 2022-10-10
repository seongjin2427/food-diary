import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { changeCurrentMonth } from '@/store/global';
import { useAppDispatch, useAppSelector } from '@/store/index';
import useCalendar from '@/hooks/useCalendar';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './Calendar.styled';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/shared/Spinner';

function Calendar() {
  const dispatch = useAppDispatch();
  const { today, currentMonth } = useAppSelector(({ global }) => global);
  const router = useRouter();
  const [currentCalendar, startDay] = useCalendar();

  const { isFetching } = useQuery(['useCalendar', currentMonth]);

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
    dispatch(changeCurrentMonth(dayjs(currentMonth).add(n, 'month').toString()));
  };

  if (isFetching) {
    return <Spinner color='lightcoral' size='2rem' speed='1' />;
  }

  return (
    <S.Container>
      <S.MonthArea>
        <S.CalendarButton onClick={() => moveMonth(-1)}>
          <SVGIcon icon='ChevronLeftIcon' width='2rem' height='2rem' />
        </S.CalendarButton>
        <S.Month>{dayjs(currentMonth).format('MMM YYYY')}</S.Month>
        <S.CalendarButton onClick={() => moveMonth(1)}>
          <SVGIcon icon='ChevronRightIcon' width='2rem' height='2rem' />
        </S.CalendarButton>
      </S.MonthArea>

      <S.DayArea>
        {currentCalendar.map(({ did, date, image }) => {
          return (
            <S.Day
              key={date.toString()}
              onClick={() => clickDay(date, image, did)}
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
