import type { FC, ReactNode } from 'react';
import DrawerLayout from './DrawerLayout/DrawerLayout';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <DrawerLayout>{children}</DrawerLayout>;
};

export default Layout;
