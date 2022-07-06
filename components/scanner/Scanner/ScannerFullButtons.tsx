import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { camerasState, selectedCameraState } from 'states';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import CameraIcon from '@mui/icons-material/CameraAltOutlined';
import ImageIcon from '@mui/icons-material/Image';
import {
  ButtonGroup,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Typography,
  IconButton,
} from '@mui/material';

export const ScannerButtons: FC = ({}) => {
  const { t } = useTranslation('scanner');
  const [open, setOpen] = useState<boolean>(false);
  const cameras = useRecoilValue(camerasState);
  const setSelectedCamera = useSetRecoilState(selectedCameraState);

  return (
    <ButtonGroup
      size='small'
      variant='contained'
      sx={{
        backgroundColor: (theme) => theme.palette.common.white,
        opacity: '0.5',
      }}
    >
      <IconButton>
        <ImageIcon />
      </IconButton>
      <IconButton onClick={() => setOpen(true)}>
        <CameraIcon />
      </IconButton>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Paper>
          <Typography variant='h2' sx={{ paddingTop: '1rem' }}>
            {t('title.switchCamera')}
          </Typography>
          <MenuList>
            {cameras.map(({ id, label }) => {
              return (
                <MenuItem
                  key={id}
                  onClick={() => {
                    setSelectedCamera(id);
                    setOpen(false);
                  }}
                >
                  {label}
                </MenuItem>
              );
            })}
          </MenuList>
        </Paper>
      </Popover>
    </ButtonGroup>
  );
};

export default ScannerButtons;
