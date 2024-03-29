import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';

import { changeCurrentMonth } from '@/store/global';
import { useAppDispatch, useAppSelector } from '@/store/index';
import useCalendar from '@/hooks/useCalendar';
import SVGIcon from '@/components/shared/SVGIcon';
import Spinner from '@/components/shared/Spinner';
import * as S from './Calendar.styled';

function Calendar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { today, currentMonth } = useAppSelector(({ global }) => global);
  const [currentCalendar, startDay] = useCalendar();

  const { isFetching, refetch } = useQuery(['useCalendar', currentMonth], {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, []);

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
    const nextMonth = dayjs(currentMonth).add(n, 'month').toString();
    dispatch(changeCurrentMonth(nextMonth));
  };

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

      <S.Weekend>
        <S.WeekDay red>Sun</S.WeekDay>
        <S.WeekDay>Mon</S.WeekDay>
        <S.WeekDay>Tue</S.WeekDay>
        <S.WeekDay>Wed</S.WeekDay>
        <S.WeekDay>Thu</S.WeekDay>
        <S.WeekDay>Fri</S.WeekDay>
        <S.WeekDay blue>Sat</S.WeekDay>
      </S.Weekend>

      {isFetching ? (
        <Spinner color='lightcoral' size='2rem' speed='1' />
      ) : (
        <S.DayArea>
          {currentCalendar.map(({ date, image, did }) => {
            return (
              <S.Day
                key={date.toString()}
                onClick={() => clickDay(date, image, did)}
                startDay={startDay}
              >
                {image ? (
                  <S.ImageWrapper>
                    <Image src={image} width='120%' height='100%' layout='fixed' alt='thumbnail' />
                  </S.ImageWrapper>
                ) : (
                  <S.Date today={dayjs(today).format('YYYY-MM-DD') === date}>
                    {date.split('-')[2]}
                  </S.Date>
                )}
              </S.Day>
            );
          })}
        </S.DayArea>
      )}
    </S.Container>
  );
}

export default Calendar;
