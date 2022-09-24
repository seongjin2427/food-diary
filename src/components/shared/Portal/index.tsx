/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { ReactNode } from 'react';
import reactDom from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const el = document.getElementById('portal');
  return reactDom.createPortal(children, el!);
};

export default Portal;
