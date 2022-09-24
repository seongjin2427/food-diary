import { useState, useEffect } from 'react';

const useCalendar = (): [Date, Date[], number] => {
  const [today, setToday] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date[]>([]);
  const [startDay, setStartDay] = useState<number>(1);

  useEffect(() => {
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setStartDay(firstDay);

    const calendar: Date[] = [];
    for (let i = 0; i < lastDay.getDate(); i++) {
      calendar.push(new Date(today.getFullYear(), today.getMonth(), 1 + i));
    }
    setCurrentMonth(calendar);
  }, []);

  return [today, currentMonth, startDay];
};

export default useCalendar;
