import SVGIcon from '@/components/shared/SVGIcon';

export const HOME_HEADER_DROPDOWN = [
  {
    icon: <SVGIcon icon='HomeIcon' key='home' width='2.5rem' height='2.5rem' />,
    url: '/',
  },
  {
    icon: <SVGIcon icon='RoadMapIcon' key='map' width='2.5rem' height='2.5rem' />,
    url: '/maps',
  },
];

export type HomeHeaderDropdownType = typeof HOME_HEADER_DROPDOWN;
