import type { FC } from 'react';
import { Marker } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { markersState } from 'states/map';

export const MapboxMarkers: FC = () => {
  const markers = useRecoilValue(markersState);

  return (
    <>
      {markers.map(({ id, lat, lng }) => (
        <Marker
          key={id}
          color="red"
          longitude={lng}
          latitude={lat}
          draggable
        ></Marker>
      ))}
    </>
  );
};

export default MapboxMarkers;
