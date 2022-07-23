import type { FC } from 'react';
import { Fragment } from 'react';
import Link from 'next/link';
import { Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { components } from 'constants/components';

export const ComponentList: FC = () => {
  return (
    <List>
      {components.map(({ id, title, href }) => (
        <Fragment key={id}>
          <ListItem sx={{ justifyContent: 'center' }}>
            <Link href={`/components${href}`} passHref>
              <Button>
                <ListItemText>{title}</ListItemText>
              </Button>
            </Link>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default ComponentList;
