import React, { ReactNode } from 'react';
import reactDom from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const el = document.getElementById('footer');
  return reactDom.createPortal(children, el!);
};

export default Portal;
