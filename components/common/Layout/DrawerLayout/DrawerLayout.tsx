import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography } from '@mui/material';
import {
  DrawerMain,
  DrawerHeader,
  DrawerTopNav,
  DrawerSideNav,
} from 'components';

export interface DrawerLayout {
  children: ReactNode;
}

const drawerWidth = '15rem';
const breakPoint = 900;

export const DrawerLayout: FC<DrawerLayout> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const { width } = useWindowSize();

  const toggleDrawer = useCallback(() => {
    setOpenDrawer((oldVal) => !oldVal);
  }, []);

  useEffect(() => {
    if (width > breakPoint) {
      setOpenDrawer(true);
      setIsMobile(false);
    }

    return () => {
      setOpenDrawer(false);
      setIsMobile(true);
    };
  }, [width]);

  return (
    <>
      <DrawerTopNav
        position='fixed'
        open={openDrawer}
        isMobile={isMobile}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>Top Nav</Typography>
        </Toolbar>
      </DrawerTopNav>
      <DrawerSideNav
        open={openDrawer}
        drawerWidth={drawerWidth}
        breakPoint={breakPoint}
        onClose={() => setOpenDrawer(false)}
        screenWidth={width}
      />
      <DrawerHeader />
      <DrawerMain
        component='main'
        open={openDrawer}
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        sx={{
          height: { xs: `calc(100vh - 56px)`, sm: 'calc(100vh - 64px)' },
          overflowY: 'auto',
        }}
      >
        {children}
      </DrawerMain>
    </>
  );
};

export default DrawerLayout;
