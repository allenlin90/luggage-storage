import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
  Typography,
  TypographyProps,
} from '@mui/material';

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
  text,
}) => {
  const { t } = useTranslation('common');

  return (
    <Box sx={{ textAlign: 'center' }} {...BoxProps}>
      <CircularProgress {...CircularProps} />
      <Typography color='primary' {...TypographyProps}>
        {text ? text : `${t('hint.loading')}...`}
      </Typography>
    </Box>
  );
};

export default Loader;
