import { FC } from 'react';
import { Box } from '@mui/material';

import dynamic from 'next/dynamic';
const WarehouseDnD = dynamic(() => import('./WarehouseDnD'));

export const Warehouse: FC = () => {
  return (
    <Box
      component='section'
      sx={{
        width: '100%',
        height: 'calc(100vh - 16px)',
        position: 'relative',
      }}
    >
      <WarehouseDnD />
    </Box>
  );
};

export default Warehouse;
