import SVGIcon from '@/components/shared/SVGIcon';

export const HOME_HEADER_DROPDOWN = [
  {
    icon: <SVGIcon icon='HomeIcon' key='home' width='2rem' height='2rem' />,
    url: '/',
  },
  {
    icon: <SVGIcon icon='RoadMapIcon' key='map' width='2rem' height='2rem' />,
    url: '/maps',
  },
];

export type HomeHeaderDropdownType = typeof HOME_HEADER_DROPDOWN;
