import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  useEffect,
  useRef,
  forwardRef,
  memo,
  useImperativeHandle,
} from 'react';
import { useWindowSize } from 'react-use';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { camerasState, selectedCameraState } from 'states';
import { styled } from '@mui/material';
import { startCamera, stopCamera } from 'utils/camera';

const StyledVideo = styled('video')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}));

export interface IVideoProps {
  open?: boolean;
}

export interface ICameraRef {
  video: () => HTMLVideoElement | null;
  stream: () => MediaStream | null;
  stopCamera: () => void;
}

export const Video: ForwardRefExoticComponent<
  IVideoProps & RefAttributes<ICameraRef>
> = memo(
  forwardRef<ICameraRef, IVideoProps>(
    ({ open = false, ...props }, forwardedRef) => {
      const { width, height } = useWindowSize();
      const streamRef = useRef<MediaStream | null>(null);
      const videoRef = useRef<HTMLVideoElement | null>(null);
      const setCameras = useSetRecoilState(camerasState);
      const selectedCamera = useRecoilValue(selectedCameraState);

      useImperativeHandle(forwardedRef, () => ({
        video: () => videoRef.current,
        stream: () => streamRef.current,
        startCamera: () => {
          if (videoRef.current) {
            startCamera({
              video: videoRef.current,
              deviceId: selectedCamera,
              videoConstraints: { height, width },
              onError: (error: any) => console.log(error),
            });
          }
        },
        stopCamera: () =>
          streamRef.current && stopCamera(videoRef.current, streamRef.current),
      }));

      useEffect(() => {
        if (open && videoRef.current) {
          startCamera({
            video: videoRef.current,
            deviceId: selectedCamera,
            videoConstraints: { height, width },
            onError: (error: any) => console.log(error),
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
      }, []);

      return <StyledVideo ref={videoRef} {...props} />;
    }
  )
);

Video.displayName = 'Video';

export default memo(Video);
