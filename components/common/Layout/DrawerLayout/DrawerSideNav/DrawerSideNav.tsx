import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Drawer, Divider } from '@mui/material';
import {
  FlexSpacer,
  DrawerSignout,
  DrawerSettings,
  DrawerSideHead,
  DrawerSideLinks,
  DrawerSelect,
} from 'components';

export interface DrawerSideNav {
  screenWidth?: number;
  drawerWidth?: string;
  breakPoint?: number;
  open?: boolean;
  onClose?: () => void;
}

export const DrawerSideNav: FC<DrawerSideNav> = ({
  screenWidth = 0,
  drawerWidth = '15rem',
  breakPoint = 900,
  open = false,
  onClose = () => console.warn('no callback is given to DrawerSideNav'),
}) => {
  const { t } = useTranslation('common');

  return (
    <Drawer
      anchor='left'
      variant={screenWidth > breakPoint ? 'persistent' : 'temporary'}
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiDrawer-paper': { width: drawerWidth },
      }}
    >
      <DrawerSideHead placeholder={t('sideNav.warehouse')} />
      <Divider sx={{ marginY: 0 }} />
      <DrawerSelect />
      <Divider sx={{ marginY: 0 }} />
      <DrawerSideLinks />
      <Divider />
      <DrawerSettings settingsText={t('sideNav.setting')} />
      <FlexSpacer />
      <Divider sx={{ marginY: 0 }} />
      <DrawerSignout signoutText={t('sideNav.btn.signout')} />
    </Drawer>
  );
};

export default DrawerSideNav;
