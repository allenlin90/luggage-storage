import type { FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

import dynamic from 'next/dynamic';
const DrawerLayout = dynamic(() => import('./DrawerLayout/DrawerLayout'));
const Box = dynamic(() => import('@mui/material/Box'));

interface LayoutProps {
  children?: ReactNode;
}

export const GeneralLayout: FC<LayoutProps> = ({ children }) => {
  return <Box component='main'>{children}</Box>;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return <DrawerLayout>{children}</DrawerLayout>;
  }

  return <GeneralLayout>{children}</GeneralLayout>;
};

export default Layout;
