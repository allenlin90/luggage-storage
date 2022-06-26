import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { DrawerLayout } from 'components';
import { useSession } from 'next-auth/react';

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
