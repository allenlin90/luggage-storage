import type { FC, Dispatch, SetStateAction } from 'react';
import type { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useWindowSize } from 'react-use';
import { useTranslation } from 'next-i18next';
import { isMobile } from 'react-device-detect';
import { camerasState, selectedCameraState } from 'states';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Box, Backdrop, IconButton, styled } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ScannerTitle from './ScannerTitle';

import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('components/common/Loader'));
const ScannerFullButtons = dynamic(() => import('./ScannerFullButtons'));

const ButtonWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 45,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: theme.zIndex.drawer + 2,
  width: '100%',
  maxWidth: '500px',
  padding: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
}));

export type FacingMode = 'environment' | 'user';

export interface CameraStarter {
  facingMode?: FacingMode;
  deviceId?: { exact: string };
}

export interface ScannerFullProps {
  isScanning?: boolean;
  setIsScanning?: Dispatch<SetStateAction<boolean>>;
  setIsDenied?: Dispatch<SetStateAction<boolean>>;
}

export const ScannerFull: FC<ScannerFullProps> = ({
  isScanning = false,
  setIsScanning = () =>
    console.warn("no isScanning setter is given to 'ScannerFull'"),
  setIsDenied = () =>
    console.warn("no isDenied setter is given to 'ScannerFull'"),
}) => {
  const { width, height } = useWindowSize();
  const { t } = useTranslation(['scanner', 'common']);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setCameras = useSetRecoilState(camerasState);
  const [selectedCamera, setSelectedCamera] =
    useRecoilState(selectedCameraState);

  const camConfig = useMemo(() => {
    const minWidth = Math.min(height, width);
    const ratio = 2 / 3;
    const aspectRatio = isMobile
      ? Math.ceil((height / width) * 100) / 100
      : width / height;
    const qrbox = isMobile
      ? { width: minWidth * ratio, height: minWidth * ratio }
      : 300;
    return {
      fps: 2,
      qrbox,
      aspectRatio,
    };
  }, [width, height]);

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

          await scanner.start(camStarter, camConfig, onSuccess, onError);
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log('something went wrong when starting camera');
        console.log(error.message || error);
      }
    },
    [width, height, camConfig]
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

      setIsScanning(false);
      setIsLoading(false);
    };
  }, [setIsScanning, setIsLoading]);

  // switch between cameras
  useEffect(() => {
    startScanner(scannerRef.current, selectedCamera);
  }, [startScanner, selectedCamera]);

  return (
    <Backdrop
      open={isScanning}
      sx={{
        backdropFilter: 'blur(4px)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScannerTitle title={t('title.scanQrCode')} />
      {isLoading && (
        <Loader
          BoxProps={{
            sx: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
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
      <Box id='reader' sx={{ width: '100%', height: '100%' }} />
      <IconButton
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
        }}
        onClick={() => {
          if (scannerRef.current && scannerRef.current.getState() === 2) {
            scannerRef.current.stop().then(() => {
              scannerRef.current?.clear();
              scannerRef.current = null;
            });
          }
          setIsScanning(false);
        }}
      >
        <CancelIcon sx={{ color: (theme) => theme.palette.white.main }} />
      </IconButton>
      <ButtonWrapper>
        <ScannerFullButtons />
      </ButtonWrapper>
    </Backdrop>
  );
};

export default ScannerFull;
