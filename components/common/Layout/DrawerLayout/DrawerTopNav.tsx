import { FC, useState, useEffect } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, Toolbar, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export interface DrawerTopNavProps {
  open?: boolean;
  drawerWidth?: string;
  isMobile?: boolean;
  position?: string;
  onClick?: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'drawerWidth' && prop !== 'isMobile',
})<DrawerTopNavProps>(
  ({ theme, open = false, drawerWidth = '16rem', isMobile = true }) => ({
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

export const DrawerTopNav: FC<DrawerTopNavProps> = ({
  open = false,
  isMobile = true,
  onClick = () => console.warn('no callback giving to DrawerTopNav'),
}) => {
  const { asPath } = useRouter();
  const [onPath, setOnPath] = useState<string>('');
  const { t } = useTranslation('common');
  useEffect(() => {
    const paths = asPath.split('/');
    setOnPath(paths[1]);

    return () => setOnPath('');
  }, [asPath]);

  return (
    <AppBar open={open} position='fixed' isMobile={isMobile} elevation={0}>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
          onClick={onClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h1' sx={{ fontSize: '2rem', fontWeight: 600 }}>
          {t(`links.${onPath}`)}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DrawerTopNav;
