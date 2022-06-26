import { FC } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

export interface DrawerSideHeadProps {
  placeholder?: string;
  imgSrc?: string;
  drawerWidth?: string;
}

export const DrawerSideHead: FC<DrawerSideHeadProps> = ({
  placeholder = 'Warehouse',
  imgSrc,
  drawerWidth = '16rem',
}) => {
  return (
    <Box
      sx={{
        height: { xs: '56px', sm: '64px' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {imgSrc ? (
        <Image
          layout='responsive'
          width={drawerWidth}
          height='3rem'
          src={imgSrc}
          alt='logo'
        />
      ) : (
        <Typography
          variant='h1'
          sx={{
            fontSize: '2rem',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {placeholder}
        </Typography>
      )}
    </Box>
  );
};

export default DrawerSideHead;
