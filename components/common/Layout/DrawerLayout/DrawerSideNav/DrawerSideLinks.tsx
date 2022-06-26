import Link from 'next/link';
import { FC, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import WarehouseIcon from '@mui/icons-material/WarehouseOutlined';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScannerOutlined';
import { sideLinks } from 'utils';
import { DrawerSettings } from 'components';
import { Divider } from '@mui/material';

const linkIcons: { [key: string]: ReactNode } = {
  warehouse: <WarehouseIcon />,
  scanner: <QrCodeScannerIcon />,
};

export const DrawerSideLinks: FC = () => {
  const { t } = useTranslation('common');
  const [onPath, setOnPath] = useState<string>('');
  const { asPath } = useRouter();

  useEffect(() => {
    const paths = asPath.split('/');
    setOnPath(() => paths[paths.length - 1]);
    return () => setOnPath('');
  }, [asPath]);

  return (
    <List>
      {sideLinks.map(({ id, href }) => {
        return (
          <Link key={id} href={href} passHref>
            <ListItem button selected={id === onPath}>
              <ListItemIcon>{linkIcons[id]}</ListItemIcon>
              <ListItemText>
                <Typography>{t(`links.${id}`)}</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        );
      })}
      <Divider />
      <DrawerSettings
        settingsText={t('sideNav.setting')}
        selected={onPath === 'settings'}
      />
    </List>
  );
};

export default DrawerSideLinks;
