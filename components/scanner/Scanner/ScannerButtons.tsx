import type { Dispatch, FC, SetStateAction } from 'react';
import type { Camera } from 'types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { camerasState, selectedCameraState } from 'states';
import ImageIcon from '@mui/icons-material/Image';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { ButtonGroup, IconButton, Select, MenuItem } from '@mui/material';

export interface ScannerButtonsProps {
  setIsScanning?: Dispatch<SetStateAction<boolean>>;
}

export const ScannerButtons: FC<ScannerButtonsProps> = ({
  setIsScanning = () =>
    console.warn("no isScanning setter is given to 'ScannerButtons'"),
}) => {
  const [selectedCamera, setSelectedCamera] =
    useRecoilState(selectedCameraState);
  const cameras = useRecoilValue(camerasState);

  return (
    <ButtonGroup
      size='small'
      variant='contained'
      fullWidth
      sx={{ maxWidth: '350px' }}
    >
      <IconButton>
        <ImageIcon />
      </IconButton>
      <IconButton onClick={() => setIsScanning(false)}>
        <StopCircleIcon color='error' />
      </IconButton>
      <Select
        size='small'
        value={selectedCamera}
        onChange={(e) => setSelectedCamera(e.target.value)}
        fullWidth
      >
        {cameras.map(({ id, label }) => {
          return (
            <MenuItem key={id} value={id}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </ButtonGroup>
  );
};

export default ScannerButtons;
