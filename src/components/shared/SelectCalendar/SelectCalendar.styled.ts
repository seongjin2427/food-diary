import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface CalendarType {
  isOpen: boolean;
  alignDirection?: 'left' | 'right';
}

export const Container = styled.div`
  width: 100%;
`;

export const Backdrop = styled.div<CalendarType>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: fixed;
    `}
`;

export const PeriodInput = styled.input`
  width: 7rem;
  height: 2rem;
  text-align: center;
  border: none;
  font-size: 1.125rem;
  :focus {
    color: ${({ theme }) => theme.color.primary};
    outline: none;
  }
`;

export const Calendar = styled.div<CalendarType>`
  display: none;
  position: absolute;
  top: 2rem;
  z-index: 20;

  .react-calendar {
    width: 280px;
    border-radius: 0.5rem;

    abbr {
      font-size: 0.875rem;
      text-decoration: none;
    }

    .react-calendar__navigation button {
      font-size: 1rem;
    }

    .react-calendar__tile--now {
      background: ${({ theme }) => theme.color.third};
      :enabled:hover {
        background: ${({ theme }) => theme.color.secondary};
      }
    }

    .react-calendar__tile--active {
      background: ${({ theme }) => theme.color.secondary};
      :enabled:hover {
        background: ${({ theme }) => theme.color.primary};
      }
    }
  }
  ${({ isOpen, alignDirection }) =>
    isOpen &&
    css`
      display: block;
      ${alignDirection === 'left' ? 'left: 0;' : 'right: 0'}
    `}
`;
