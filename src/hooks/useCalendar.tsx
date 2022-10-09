import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { setOnToday } from '@/store/global';
import { getDiaryByMonth } from '@/api/diary';
import { useAppDispatch, useAppSelector } from '@/store/index';

interface CalendarDate {
  did: number | null | undefined;
  date: string;
  image: string | undefined;
}

const useCalendar = (): [Date, CalendarDate[], number, (v: number) => void] => {
  const dispatch = useAppDispatch();
  // const { today: reduxToday, currentMonth } = useAppSelector(({ global }) => global);
  const [today, setToday] = useState<Date>(new Date());
  const [calendar, setCalendar] = useState<CalendarDate[]>([]);
  const [startDay, setStartDay] = useState<number>(1);

  // const today = new Date(reduxToday);

  const { data } = useQuery(
    ['useCalendar', today],
    () => getDiaryByMonth(dayjs(today).format('YYYY-MM')),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
        const calendar: CalendarDate[] = makeAllDates(0);

        setStartDay(firstDay);
        setCalendar(calendar);
      },
    },
  );

  useEffect(() => {
    if (today.getMonth() === new Date().getMonth()) {
      setToday(new Date());
    }
  }, [startDay]);

  const setMonth = (n: number) => {
    const calendar: CalendarDate[] = makeAllDates(n);
    const nextMonth = dayjs(today)
      ['month'](today.getMonth() + n)
      .startOf('month')
      .toDate();

    setToday(nextMonth);
    setCalendar(calendar);
  };

  const makeAllDates = useCallback(
    (n: number): CalendarDate[] => {
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1 + n, 0);
      const calendar: CalendarDate[] = [];

      let findDate: string;

      for (let i = 0; i < lastDay.getDate(); i++) {
        const pushData: CalendarDate = { date: '', image: '', did: null };
        findDate = dayjs(new Date(today.getFullYear(), today.getMonth() + n, 1 + i)).format(
          'YYYY-MM-DD',
        );
        pushData.date = findDate;

        const findData = data?.find((d) => d.date === findDate);
        pushData.image = findData?.image;
        pushData.did = findData?.did;

        calendar.push(pushData);
      }
      return calendar;
    },
    [today, calendar, data],
  );

  return [today, calendar, startDay, setMonth];
};

export default useCalendar;
