import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getDiaryByMonth } from '@/api/diary';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { userLogout } from '@/store/global';

interface CalendarDate {
  did: number | null | undefined;
  date: string;
  image: string | undefined;
}

const useCalendar = (): [CalendarDate[], number] => {
  const dispatch = useAppDispatch();
  const { currentMonth } = useAppSelector(({ global }) => global);

  const [day, setDay] = useState<number>(1);
  const [calendar, setCalendar] = useState<CalendarDate[]>([]);
  const [fetchedDiary, setFetchedDiary] = useState<CalendarDate[]>([]);

  useQuery(
    ['useCalendar', currentMonth],
    () => getDiaryByMonth(dayjs(currentMonth).format('YYYY-MM')),
    {
      refetchOnWindowFocus: false,
      onSuccess: (fetched) => {
        if (fetched) setFetchedDiary(fetched);
      },
      onError: (err) => {
        // alert('다시 로그인이 필요합니다.');
        localStorage.removeItem('Authorization');
        dispatch(userLogout());
      },
    },
  );

  useEffect(() => {
    const madeCalendar = makeCalendar();
    const startDay = dayjs(currentMonth).set('date', 1).toDate().getDay();

    setCalendar(madeCalendar);
    setDay(startDay);
  }, [fetchedDiary]);

  const makeCalendar = useCallback(() => {
    const firstDay = dayjs(currentMonth).startOf('month').toDate();
    const lastDay = dayjs(currentMonth).endOf('month').toDate().getDate();

    const returnCalendar: CalendarDate[] = [];
    for (let i = 0; i < lastDay; i++) {
      returnCalendar.push({
        did: null,
        date: dayjs(firstDay)
          .set('date', i + 1)
          .format('YYYY-MM-DD')
          .toString(),
        image: '',
      });
    }

    returnCalendar.forEach((c) => {
      fetchedDiary.forEach((d) => {
        if (d.date === c.date) {
          c.did = d.did;
          c.image = d.image;
        }
      });
    });

    return returnCalendar;
  }, [calendar, currentMonth, fetchedDiary]);

  return [calendar, day];
};

export default useCalendar;
