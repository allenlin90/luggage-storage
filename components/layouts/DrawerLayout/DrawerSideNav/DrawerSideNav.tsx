import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Drawer, Divider } from '@mui/material';
import FlexSpacer from 'components/common/FlexSpacer';
import DrawerSignout from './DrawerSignout';
import DrawerSideHead from './DrawerSideHead';
import DrawerSideLinks from './DrawerSideLinks';

import dynamic from 'next/dynamic';
const BranchSelect = dynamic(() => import('components/common/BranchSelect'));

export interface DrawerSideNav {
  screenWidth?: number;
  drawerWidth?: string;
  breakPoint?: number;
  isMobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export const DrawerSideNav: FC<DrawerSideNav> = ({
  screenWidth = 0,
  drawerWidth = '16rem',
  breakPoint = 900,
  isMobile = true,
  open = false,
  onClose = () => console.warn('no callback is given to DrawerSideNav'),
}) => {
  const { t } = useTranslation('common');

  return (
    <Drawer
      anchor="left"
      variant={screenWidth > breakPoint ? 'persistent' : 'temporary'}
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiDrawer-paper': { width: drawerWidth },
      }}
    >
      <DrawerSideHead
        placeholder={t('sideNav.warehouse')}
        // imgSrc=""
      />
      <Divider />
      {isMobile && (
        <>
          <BranchSelect isMobile={isMobile} />
          <Divider />
        </>
      )}
      <DrawerSideLinks />
      <FlexSpacer />
      <Divider />
      <DrawerSignout signoutText={t('sideNav.btn.signout')} />
    </Drawer>
  );
};

export default DrawerSideNav;
