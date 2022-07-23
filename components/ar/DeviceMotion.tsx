import type { FC } from 'react';
import { useMotion } from 'react-use';
import { ListItem, ListItemText, Typography } from '@mui/material';

export const DeviceMotion: FC = () => {
  const {
    rotationRate: { alpha, beta, gamma },
  } = useMotion();

  return (
    <>
      <ListItem disablePadding>
        <ListItemText sx={{ textAlign: 'end' }}>
          <Typography
            component="span"
            sx={{ color: (t) => t.palette.white.main }}
          >
            Alpha: {alpha?.toFixed(4)}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ textAlign: 'end' }}>
          <Typography
            component="span"
            sx={{ color: (t) => t.palette.white.main }}
          >
            Beta: {beta?.toFixed(4)}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ textAlign: 'end' }}>
          <Typography
            component="span"
            sx={{ color: (t) => t.palette.white.main }}
          >
            Gamma: {gamma?.toFixed(4)}
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default DeviceMotion;
