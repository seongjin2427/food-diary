import { SVGProps } from 'react';
import * as Icons from '@/assets/index';

export type IconKeySet = keyof typeof Icons;

interface SVGIconProps extends SVGProps<SVGSVGElement> {
  icon: IconKeySet;
}

const SVGIcon = ({ icon, ...props }: SVGIconProps) => {
  const IconComponent = Icons[icon];
  return <IconComponent {...props} />;
};

export default SVGIcon;
