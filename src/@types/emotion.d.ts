import '@emotion/react';
import { ColorType, IconColorType } from '../styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    color: ColorType;
    iconColor: IconColorType;
  }
}
