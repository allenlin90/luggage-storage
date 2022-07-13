import type { FC } from 'react';
import { Box } from '@mui/material';
import Loader from 'components/common/loader/Loader';

import dynamic from 'next/dynamic';
const WarehouseDnD = dynamic(() => import('./WarehouseDnD'), {
  loading: () => <Loader />,
  ssr: false,
});

export const Warehouse: FC = () => {
  return (
    <Box
      component="section"
      width="100%"
      height="100%"
      sx={{
        position: 'relative',
      }}
    >
      <WarehouseDnD />
    </Box>
  );
};

export default Warehouse;
