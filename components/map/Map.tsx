import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import { Box } from '@mui/material';
import Loader from 'components/common/Loader';

import dynamic from 'next/dynamic';
const Mapbox = dynamic(() => import('./Mapbox'), {
  loading: () => <Loader />,
  ssr: false,
});

export const Map: FC = () => {
  const mapContainerRef = useRef<ReactNode>(null);

  return (
    <Box
      ref={mapContainerRef}
      width="100%"
      height="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Mapbox containerRef={mapContainerRef} />
    </Box>
  );
};

export default Map;
