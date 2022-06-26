import { FC, useTransition } from 'react';
import { signOut } from 'next-auth/react';
import ExitIcon from '@mui/icons-material/ExitToAppOutlined';
import { ListItem, ListItemText, IconButton, Typography } from '@mui/material';

export interface DrawerSignoutProps {
  signoutText?: string;
}

export const DrawerSignout: FC<DrawerSignoutProps> = ({
  signoutText = 'Signout',
}) => {
  return (
    <ListItem
      button
      secondaryAction={
        <IconButton>
          <ExitIcon />
        </IconButton>
      }
      onClick={() => signOut()}
    >
      <ListItemText>
        <Typography>{signoutText}</Typography>
      </ListItemText>
    </ListItem>
  );
};

export default DrawerSignout;
