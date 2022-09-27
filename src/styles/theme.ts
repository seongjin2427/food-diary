import { Theme } from '@emotion/react';

const color = {
  primary: 'lightgrey',
};

const iconColor = {
  black: '#2a2a2a',
  red: '#F96666',
  green: '#3D8361',
  blue: '#31C6D4',
  yellow: '#F2D388',
};

const theme: Theme = {
  color,
  iconColor,
};

export type ColorType = typeof color;
export type IconColorType = typeof iconColor;
export type IconColorKeyType = keyof typeof iconColor;

export default theme;
