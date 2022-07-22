import type { FC } from 'react';
import type { ICameraRef } from './Video';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { arState } from 'states';
import { Backdrop } from '@mui/material';
import { CancelBtn } from 'components/common/CancelBtn';
import { Video } from 'components/common/Video';
import { Canvas } from 'components/common/Canvas';

const AugmentedReality: FC = () => {
  const cameraRef = useRef<ICameraRef>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [open, setOpen] = useRecoilState(arState);

  useEffect(() => {
    return () => {
      setOpen(false);
      canvasRef.current = null;
    };
  }, [setOpen]);

  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CancelBtn
        onClick={() => {
          setOpen(false);
          cameraRef.current?.stopCamera();
        }}
      />
      <Video open={open} ref={cameraRef} />
      <Canvas ref={canvasRef} />
    </Backdrop>
  );
};

export default AugmentedReality;
