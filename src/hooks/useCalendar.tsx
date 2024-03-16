import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { getDiaryByMonth } from '@/api/diary';
import { useAppSelector } from '@/store/index';

interface CalendarType {
  did: number | null | undefined;
  date: string;
  image: string | undefined;
}

const useCalendar = (): [CalendarType[], number] => {
  const { currentMonth } = useAppSelector(({ global }) => global);

  const [calendar, setCalendar] = useState<CalendarType[]>([]);
  const [gridStartDay, setGridStartDay] = useState<number>(1);
  const [fetchedDiary, setFetchedDiary] = useState<CalendarType[]>([]);

  useQuery(
    ['useCalendar', currentMonth],
    () => getDiaryByMonth(dayjs(currentMonth).format('YYYY-MM')),
    {
      refetchOnWindowFocus: false,
      onSuccess(fetched) {
        if (fetched) setFetchedDiary(fetched);
      },
    },
  );

  useEffect(() => {
    const madeCalendar = makeCalendar();
    setCalendar(madeCalendar);
  }, [fetchedDiary]);

  const makeCalendar = useCallback(() => {
    const startDate = dayjs(currentMonth).startOf('month').toDate();
    const startDay = startDate.getDay();
    const lastDay = dayjs(currentMonth).endOf('month').toDate().getDate();

    setGridStartDay(startDay);

    const returnCalendar: CalendarType[] = [];
    for (let i = 1; i <= lastDay; i++) {
      returnCalendar.push({
        did: null,
        date: dayjs(startDate).set('date', i).format('YYYY-MM-DD'),
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

  return [calendar, gridStartDay];
};

export default useCalendar;
