import type { FC } from 'react';
import { useGeolocation } from 'react-use';
import { ListItem, ListItemText, Typography } from '@mui/material';

export const GeoLocation: FC = () => {
  const { altitude, latitude, longitude } = useGeolocation();

  return (
    <>
      <ListItem disablePadding>
        <ListItemText sx={{ textAlign: 'end' }}>
          <Typography
            component="span"
            sx={{ color: (t) => t.palette.white.main }}
          >
            Alt: {altitude}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ textAlign: 'end' }}>
          <Typography
            component="span"
            sx={{ color: (t) => t.palette.white.main }}
          >
            Lat: {latitude?.toFixed(4)}
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ textAlign: 'end' }}>
          <Typography
            component="span"
            sx={{ color: (t) => t.palette.white.main }}
          >
            Lng: {longitude?.toFixed(4)}
          </Typography>
        </ListItemText>
      </ListItem>
    </>
  );
};

export default GeoLocation;
