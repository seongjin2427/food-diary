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

  const [day, setDay] = useState<number>(1);
  const [calendar, setCalendar] = useState<CalendarType[]>([]);
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
    const firstDay = dayjs(currentMonth).startOf('month').toDate();
    const lastDay = dayjs(currentMonth).endOf('month').toDate().getDate();
    setDay(firstDay.getDay());

    const returnCalendar: CalendarType[] = [];
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
