import { Theme } from '@emotion/react';

const color = {
  primary: '#ed2220',
  secondary: '#F26666',
  third: '#F2A7A7',
  blue: '#1D1CE5',
  black: '#0D0D0D',
  grey: '#F2F2F2',
  white: '#FFF',
};

const iconColor = {
  black: '#2a2a2a',
  red: '#F96666',
  green: '#06A18E',
  blue: '#1522ED',
  yellow: '#EDC839',
};

const theme: Theme = {
  color,
  iconColor,
};

export type ColorType = typeof color;
export type IconColorType = typeof iconColor;
export type IconColorKeyType = keyof typeof iconColor;

export default theme;
