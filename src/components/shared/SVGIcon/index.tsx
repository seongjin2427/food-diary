import { SVGProps } from 'react';
import * as Icons from '@/assets/index';

type IconSet = keyof typeof Icons;

interface SVGIconProps extends SVGProps<SVGSVGElement> {
  icon: IconSet;
}

const SVGIcon = ({ icon, ...props }: SVGIconProps) => {
  const IconComponent = Icons[icon];
  return <IconComponent {...props} />;
};

export default SVGIcon;
