import { FC } from 'react';
import Link from 'next/link';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

export interface DrawerSettingsProps {
  settingsText?: string;
}

export const DrawerSettings: FC<DrawerSettingsProps> = ({
  settingsText = 'Settings',
}) => {
  return (
    <Link href='/settings' passHref>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText>{settingsText}</ListItemText>
      </ListItem>
    </Link>
  );
};

export default DrawerSettings;
