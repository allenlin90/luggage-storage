import { FC } from 'react';
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from '@mui/material';

export interface LoaderProps {
  circularProps?: CircularProgressProps;
}

export const Loader: FC<LoaderProps> = ({ circularProps }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <CircularProgress {...circularProps} />
      <Typography color='primary'>Loading...</Typography>
    </Box>
  );
};

export default Loader;
