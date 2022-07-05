import type { FC } from 'react';
// import type { SxProps } from '@mui/material';
import {
  // Box as MuiBox,
  Box,
  BoxProps,
  // CircularProgress as MuiCircularProgress,
  CircularProgress,
  CircularProgressProps,
  // Typography as MuiTypography,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';

// const Box = styled(MuiBox, {
//   shouldForwardProp: (prop) => prop !== 'BoxProps',
// })<{ BoxProps?: SxProps }>(({ BoxProps }) => ({ ...BoxProps }));

// const CircularProgress = styled(MuiCircularProgress)<{
//   CircularProps?: SxProps;
// }>(({ CircularProps }) => ({ ...CircularProps }));

// const Typography = styled(MuiTypography)<{
//   TypographyProps?: SxProps;
// }>(({ TypographyProps }) => ({ ...TypographyProps }));

export interface LoaderProps {
  CircularProps?: CircularProgressProps;
  BoxProps?: BoxProps;
  TypographyProps?: TypographyProps;
  text?: string;
}

export const Loader: FC<LoaderProps> = ({
  CircularProps,
  BoxProps,
  TypographyProps,
  text = 'Loading',
}) => {
  return (
    <Box sx={{ textAlign: 'center' }} {...BoxProps}>
      <CircularProgress {...CircularProps} />
      <Typography color='primary' {...TypographyProps}>
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
