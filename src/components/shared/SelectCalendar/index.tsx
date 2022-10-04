import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { OnChangeDateCallback } from 'react-calendar';

import * as S from './SelectCalendar.styled';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

interface SelectCalendarProps {
  alignDirection: 'left' | 'right';
  selectDate: Date;
  setSelectDate: OnChangeDateCallback;
}

const SelectCalendar = ({
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
          value={selectDate}
          onChange={setSelectDate}
          calendarType='US'
        />
      </S.Calendar>
    </S.Container>
  );
};

export default SelectCalendar;
