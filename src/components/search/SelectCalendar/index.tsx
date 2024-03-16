import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

import * as S from './SelectCalendar.styled';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

interface SelectCalendarProps {
  type: 'prevDate' | 'nextDate';
  alignDirection: 'left' | 'right';
  selectDate: string;
  setSelectDate: (v: { name: 'prevDate' | 'nextDate'; date: Date }) => void;
}

const SelectCalendar = ({
  type,
  alignDirection = 'left',
  selectDate,
  setSelectDate,
}: SelectCalendarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClickOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const onClickClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const onChange = useCallback((date: Date) => {
    setSelectDate({ name: type, date });
  }, []);

  return (
    <S.Container>
      <S.Backdrop isOpen={open} onClick={onClickClose} />
      <S.PeriodInput
        value={dayjs(selectDate).format('YYYY-MM-DD')}
        onClick={onClickOpen}
        readOnly
      />
      <S.Calendar isOpen={open} alignDirection={alignDirection}>
        <Calendar
          formatDay={(locale, date) => dayjs(date).format('DD')}
          value={new Date(selectDate)}
          onChange={onChange}
          calendarType='US'
        />
      </S.Calendar>
    </S.Container>
  );
};

export default SelectCalendar;
