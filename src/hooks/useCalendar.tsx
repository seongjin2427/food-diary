import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getDiaryByMonth } from '@/api/diary';

interface CalendarDate {
  date: Date;
  image: {
    src: string;
  }
}

const useCalendar = (): [Date, Date[], number, (v: number) => void] => {
  const [today, setToday] = useState<Date>(new Date());
  const [calendar, setCalendar] = useState<Date[]>([]);
  const [startDay, setStartDay] = useState<number>(1);

  const useQueryaa = useQuery(
    ['useCalendar', today],
    () => getDiaryByMonth(dayjs(today).format('YYYY-MM')),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);

        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
        const calendar: Date[] = makeAllDates(0);

        setStartDay(firstDay);
        setCalendar(calendar);
      },
    },
  );

  const setMonth = (n: number) => {
    const calendar: Date[] = makeAllDates(n);
    const nextMonth = dayjs(today)
      ['month'](today.getMonth() + n)
      .startOf('month')
      .toDate();

    setToday(nextMonth);
    setStartDay(nextMonth.getDay());
    setCalendar(calendar);
  };

  const makeAllDates = (n: number) => {
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1 + n, 0);
    const calendar: Date[] = [];

    for (let i = 0; i < lastDay.getDate(); i++) {
      calendar.push(new Date(today.getFullYear(), today.getMonth() + n, 1 + i));
    }

    return calendar;
  };

  return [today, calendar, startDay, setMonth];
};

export default useCalendar;
