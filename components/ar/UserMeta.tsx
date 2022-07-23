import type { FC } from 'react';
import { Box, List } from '@mui/material';
import GeoLocation from './GeoLocation';
import DeviceMotion from './DeviceMotion';

export const UserMeta: FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
      }}
    >
      <List disablePadding>
        <GeoLocation />
        <DeviceMotion />
      </List>
    </Box>
  );
};

export default UserMeta;
