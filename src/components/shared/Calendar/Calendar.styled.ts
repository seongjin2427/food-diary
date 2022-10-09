import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
`;

export const MonthArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  margin-bottom: 1rem;
`;

export const CalendarButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
`;

export const Month = styled.div`
  font-size: 2rem;
`;

export const DayArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5%, 1fr));
  gap: 0.25rem;
`;

interface DayProps {
  startDay: number;
}

export const Day = styled.div<DayProps>`
  font-size: 0.875rem;
  background: lightblue;
  height: 5rem;
  padding: 0.25rem;

  :first-of-type {
    grid-column: ${({ startDay }) => `${startDay + 1} / ${startDay + 2}`};
  }
`;

interface DateProps {
  today: boolean;
}

export const Date = styled.span<DateProps>`
  display: inline-block;
  ${({ today }) =>
    today &&
    css`
      font-weight: bold;
    `}
`;
