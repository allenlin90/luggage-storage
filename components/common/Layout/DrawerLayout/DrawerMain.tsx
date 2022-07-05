import { Box, styled } from '@mui/material';

export const DrawerMain = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'drawerWidth' && prop !== 'isMobile',
})<{
  open?: boolean;
  drawerWidth?: string;
  isMobile?: boolean;
}>(({ theme, open = false, drawerWidth = '16rem', isMobile = true }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowY: 'auto',
  [theme.breakpoints.up('xs')]: {
    height: 'calc(100vh - 56px)',
  },
  [theme.breakpoints.up('sm')]: {
    height: 'calc(100vh - 64px)',
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: isMobile ? 0 : drawerWidth,
  }),
}));

export default DrawerMain;
