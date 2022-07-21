import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useWindowSize } from 'react-use';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { arState, camerasState, selectedCameraState } from 'states';
import { Backdrop } from '@mui/material';
import { CancelBtn } from 'components/common/CancelBtn';
import { Video } from 'components/common/Video';
import { Canvas } from 'components/common/Canvas';
import { startCamera, stopCamera } from 'utils/camera';

const AugmentedReality: FC = () => {
  const { width, height } = useWindowSize();
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [open, setOpen] = useRecoilState(arState);
  const setCameras = useSetRecoilState(camerasState);
  const selectedCamera = useRecoilValue(selectedCameraState);

  useEffect(() => {
    if (open && videoRef.current) {
      startCamera({
        video: videoRef.current,
        deviceId: selectedCamera,
        videoConstraints: { height, width },
        onError: (error) => console.log(error),
      }).then((media) => {
        if (media) {
          setCameras(media.devices);
          streamRef.current = media.stream;
        }
      });
    }
  }, [open, setCameras, selectedCamera, width, height]);

  useEffect(() => {
    return () => {
      setOpen(false);

      if (streamRef.current) {
        stopCamera(videoRef.current, streamRef.current)
          .then(() => {
            videoRef.current = null;
            streamRef.current = null;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  }, [setOpen]);

  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CancelBtn
        onClick={() => {
          setOpen(false);
          if (videoRef.current && streamRef.current) {
            stopCamera(videoRef.current, streamRef.current);
          }
        }}
      />
      <Video ref={videoRef} />
      <Canvas ref={canvasRef} />
    </Backdrop>
  );
};

export default AugmentedReality;
