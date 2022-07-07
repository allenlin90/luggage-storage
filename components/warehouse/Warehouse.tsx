import type { FC } from 'react';
import { Box } from '@mui/material';

import dynamic from 'next/dynamic';
const WarehouseDnD = dynamic(() => import('./WarehouseDnD'), { ssr: false });

export const Warehouse: FC = () => {
  return (
    <Box
      component='section'
      width='100%'
      height='100%'
      sx={{
        position: 'relative',
      }}
    >
      <WarehouseDnD />
    </Box>
  );
};

export default Warehouse;
