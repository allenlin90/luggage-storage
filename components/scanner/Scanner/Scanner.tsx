import type { FC, Dispatch, SetStateAction } from 'react';
import type { Html5Qrcode } from 'html5-qrcode';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowSize } from 'react-use';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { camerasState, selectedCameraState } from 'states';
import { useTranslation } from 'next-i18next';
import { Box } from '@mui/material';

import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('components/common/Loader'));
const ScannerButtons = dynamic(() => import('./ScannerButtons'));

export type FacingMode = 'environment' | 'user';

export interface CameraStarter {
  facingMode?: FacingMode;
  deviceId?: { exact: string };
}

export interface ScannerProps {
  isScanning?: boolean;
  cameraSize?: string;
  setIsDenied?: Dispatch<SetStateAction<boolean>>;
  setIsScanning?: Dispatch<SetStateAction<boolean>>;
}

export const Scanner: FC<ScannerProps> = ({
  isScanning = false,
  cameraSize = '350px',
  setIsDenied = () =>
    console.warn("no isDenied setter is given to 'ScannerFull'"),
  setIsScanning = () =>
    console.warn("no isScanning setter is given to 'ScannerFull'"),
}) => {
  const { width, height } = useWindowSize();
  const { t } = useTranslation(['scanner', 'common']);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setCameras = useSetRecoilState(camerasState);
  const [selectedCamera, setSelectedCamera] =
    useRecoilState(selectedCameraState);

  const startScanner = useCallback(
    async (scanner: Html5Qrcode | null, cameraId?: string) => {
      const onSuccess = (decodedText: string) => {
        console.log(decodedText);
      };

      const onError = (errorText: string) => {
        // console.log(errorText);
      };

      try {
        setIsLoading(true);
        if (scanner) {
          if (scanner.getState() === 2) {
            await scanner.stop();
            scanner.clear();
          }

          let camStarter: CameraStarter = {
            facingMode: 'environment',
          };
          if (cameraId) {
            camStarter = { deviceId: { exact: cameraId } };
          }

          let boxSize = 350;
          if (width < boxSize && height < boxSize) {
            boxSize = width > height ? height : width;
          }

          await scanner.start(
            camStarter,
            { fps: 2, qrbox: boxSize, aspectRatio: 1 },
            onSuccess,
            onError
          );
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log('something went wrong when starting camera');
        console.log(error.message || error);
      }
    },
    [width, height]
  );

  const initScanner = useCallback(async () => {
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const cams = await Html5Qrcode.getCameras();
      if (cams.length) {
        setCameras(cams);
        const scanner = new Html5Qrcode('reader');
        if (scannerRef.current) {
          await scannerRef.current.stop();
          scannerRef.current.clear();
          scannerRef.current = null;
        }
        scannerRef.current = scanner;
        startScanner(scanner, selectedCamera);
        return;
      }

      throw new Error('no camera is available');
    } catch (error: any) {
      console.log('something went wrong when init qr reader');
      console.warn(error);
      if (error === 'NotAllowedError : Permission denied') {
        setIsScanning(false);
        setIsLoading(false);
        setIsDenied(true);
      }
    }
  }, [
    startScanner,
    setIsScanning,
    setIsLoading,
    setIsDenied,
    selectedCamera,
    setCameras,
  ]);

  // init scanner with camera
  useEffect(() => {
    if (isScanning) {
      initScanner();
    }
  }, [initScanner, isScanning]);

  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.getState() === 2) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current?.clear();
            scannerRef.current = null;
          })
          .catch((err) => {
            console.warn('something went wrong when stopping scanner');
          });
      }

      setIsDenied(false);
      setIsLoading(false);
    };
  }, [setIsDenied, setIsLoading]);

  // switch between cameras
  useEffect(() => {
    startScanner(scannerRef.current, selectedCamera);
  }, [startScanner, selectedCamera]);

  useEffect(() => {
    console.log('hook');
  });

  return (
    <>
      <Box
        width='100%'
        height='100%'
        sx={{
          position: 'relative',
          maxWidth: cameraSize,
          maxHeight: cameraSize,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        {isLoading && (
          <Loader
            BoxProps={{
              sx: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
            }}
            CircularProps={{
              sx: { color: (theme) => theme.palette.white.main },
            }}
            TypographyProps={{
              sx: { color: (theme) => theme.palette.white.main },
            }}
            text={`${t('hint.starting', { ns: 'common' })}...`}
          />
        )}
        <Box id='reader' width='100%' height='100%' />
      </Box>
      <ScannerButtons setIsScanning={setIsScanning} />
    </>
  );
};

export default Scanner;
