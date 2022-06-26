import { FC } from 'react';
import { Box, Fade } from '@mui/material';
import { Loader } from 'components';

interface PageLoaderProps {
  isLoading?: boolean;
}

export const PageLoader: FC<PageLoaderProps> = ({ isLoading = false }) => {
  return (
    <Fade in={isLoading} unmountOnExit>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          // backgroundColor: 'rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          zIndex: 9999, // should be put to portal
        }}
      >
        <Loader />
      </Box>
    </Fade>
  );
};

export default PageLoader;
