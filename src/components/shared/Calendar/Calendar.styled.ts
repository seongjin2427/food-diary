import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { PopUp } from '@/styles/keyframes';

export const Container = styled.div`
  width: 100%;
  animation: ${PopUp} 0.5s ease-in-out;
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
  font-size: 2.5rem;
  font-weight: 800;
  border-bottom: 5px solid ${({ theme }) => theme.color.primary};
`;

export const Weekend = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5%, 1fr));
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

interface WeekDayProps {
  red?: boolean;
  blue?: boolean;
}

export const WeekDay = styled.div<WeekDayProps>`
  font-size: 0.875rem;
  background: ${({ theme }) => theme.color.secondary};
  border: 1px solid ${({ theme }) => theme.color.third};
  border-radius: 0.25rem;
  padding: 0.25rem;
  color: ${({ theme }) => theme.color.white};
  ${({ theme, red }) =>
    red &&
    css`
      color: ${theme.color.third};
      font-weight: 800;
    `}
  ${({ theme, blue }) =>
    blue &&
    css`
      color: ${theme.color.blue};
      font-weight: 800;
    `};
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
  background: ${({ theme }) => theme.color.third};
  border: 1px solid ${({ theme }) => theme.color.third};
  border-radius: 0.25rem;
  height: 5rem;
  padding: 0.25rem;
  position: relative;
  object-fit: cover;
  overflow: hidden;

  ${({ startDay }) => css`
    :first-of-type {
      grid-column: ${startDay + 1} / ${startDay + 2};
    }
  `}
`;

export const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  img {
    transform: scale(1.1);
  }
`;

export const Image = styled.img`
  /* position: absolute; */
  /* top: 0;
  left: 0; */
  /* width: 100%; */
  /* height: 100%; */
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
