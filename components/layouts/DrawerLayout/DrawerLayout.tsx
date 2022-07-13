import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import DrawerMain from './DrawerMain';

import dynamic from 'next/dynamic';
const DrawerTopNav = dynamic(() => import('./DrawerTopNav'));
const DrawerHeader = dynamic(() => import('./DrawerHeader'));
const DrawerSideNav = dynamic(() => import('./DrawerSideNav/DrawerSideNav'));

export interface DrawerLayout {
  children: ReactNode;
}

const drawerWidth = '16rem';
const breakPoint = 900;

export const DrawerLayout: FC<DrawerLayout> = ({ children }) => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

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
        open={openDrawer}
        isMobile={isMobile}
        onClick={toggleDrawer}
      />
      <DrawerSideNav
        open={openDrawer}
        drawerWidth={drawerWidth}
        breakPoint={breakPoint}
        onClose={() => setOpenDrawer(false)}
        screenWidth={width}
        isMobile={isMobile}
      />
      <DrawerHeader />
      <DrawerMain
        component="main"
        open={openDrawer}
        drawerWidth={drawerWidth}
        isMobile={isMobile}
      >
        {children}
      </DrawerMain>
    </>
  );
};

export default DrawerLayout;