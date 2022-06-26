import { AppBar, styled } from '@mui/material';

export const DrawerTopNav = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'drawerWidth' && prop !== 'isMobile',
})<{ open?: boolean; drawerWidth?: string; isMobile?: boolean }>(
  ({ theme, open = false, drawerWidth = '15rem', isMobile = true }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: isMobile ? '100%' : `calc(100% - ${drawerWidth})`,
      // marginLeft: isMobile ? 0 : drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

export default DrawerTopNav;
