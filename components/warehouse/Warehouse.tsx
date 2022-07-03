import { FC } from 'react';
import { Box, styled } from '@mui/material';

const Container = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  position: 'relative',
}));

import dynamic from 'next/dynamic';
const WarehouseDnD = dynamic(() => import('./WarehouseDnD'), { ssr: false });

export const Warehouse: FC = () => {
  return (
    <Container component='section'>
      <WarehouseDnD />
    </Container>
  );
};

export default Warehouse;
