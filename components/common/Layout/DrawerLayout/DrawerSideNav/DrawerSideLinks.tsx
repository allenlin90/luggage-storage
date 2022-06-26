import { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { List, ListItem, ListItemText } from '@mui/material';
import { sideLinks } from 'utils';

export const DrawerSideLinks: FC = () => {
  const { t } = useTranslation('common');

  return (
    <List>
      {sideLinks.map(({ id, href }) => {
        return (
          <Link key={id} href={href} passHref>
            <ListItem button>
              <ListItemText>{t(`sideNav.links.${id}`)}</ListItemText>
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
};

export default DrawerSideLinks;
