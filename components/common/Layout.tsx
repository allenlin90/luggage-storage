import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface GeneralProps {
  children?: ReactNode;
}

const GeneralLayout: FC<GeneralProps> = ({ children }) => {
  return <Box component='main'>{children}</Box>;
};

export const Layout: FC<GeneralProps> = ({ children }) => {
  return <GeneralLayout>{children}</GeneralLayout>;
};

export default Layout;
