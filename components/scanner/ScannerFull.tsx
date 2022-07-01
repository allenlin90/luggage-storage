import {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { Camera } from 'types';
import { useWindowSize } from 'react-use';
import { Html5Qrcode } from 'html5-qrcode';
import { useTranslation } from 'next-i18next';
import { Box, Backdrop, IconButton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Loader, ScannerButtons } from 'components';

export type FacingMode = 'environment' | 'user';

export interface CameraStarter {
  facingMode?: FacingMode;
  deviceId?: { exact: string };
}

export interface ScannerFullProps {
  isScanning?: boolean;
  setIsScanning?: Dispatch<SetStateAction<boolean>>;
  setIsStarting?: Dispatch<SetStateAction<boolean>>;
  setIsDenied?: Dispatch<SetStateAction<boolean>>;
  readData?: Dispatch<SetStateAction<string>>;
}

export const ScannerFull: FC<ScannerFullProps> = ({
  isScanning = false,
  setIsScanning = () =>
    console.warn("no isScanning setter is given to 'ScannerFull'"),
  setIsStarting = () =>
    console.warn("no isStarting setter is given to 'ScannerFull'"),
  setIsDenied = () =>
    console.warn("no isDenied setter is given to 'ScannerFull'"),
  readData = () =>
    console.warn("no data state setter is given to 'ScannerFull'"),
}) => {
  const { width, height } = useWindowSize();
  const { t } = useTranslation(['scanner', 'common']);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [openTorch, setOpenTorch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCamera, setSelectedCamera] = useState<string>('');

  const camConfig = useMemo(() => {
    return {
      fps: 2,
      qrbox: width > 600 ? 250 : 200,
      aspectRatio: width / height,
    };
  }, [width, height]);

  const startScanner = useCallback(
    async (scanner: Html5Qrcode | null, cameraId?: string) => {
      const onSuccess = (decodedText: string) => {
        console.log(decodedText);
        readData(decodedText);
      };

      const onError = (errorText: string) => {
        // console.log(errorText);
      };

      try {
        setIsStarting(true);
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

          await scanner.start(camStarter, camConfig, onSuccess, onError);
        }
        setIsStarting(false);
        setIsLoading(false);
      } catch (error: any) {
        console.log('something went wrong when starting camera');
        console.log(error.message || error);
      }
    },
    [camConfig, readData, setIsStarting]
  );

  const initScanner = useCallback(async () => {
    try {
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
        startScanner(scanner);
        return;
      }

      throw new Error('no camera is available');
    } catch (error: any) {
      console.log('something went wrong when init qr reader');
      console.warn(error);
      if (error === 'NotAllowedError : Permission denied') {
        setIsScanning(false);
        setIsLoading(false);
        setIsStarting(false);
        setIsDenied(true);
      }
    }
  }, [startScanner, setIsScanning, setIsStarting, setIsLoading, setIsDenied]);

  // init scanner with camera
  useEffect(() => {
    if (isScanning) {
      initScanner();
    }
  }, [initScanner, isScanning]);

  // switch between cameras
  useEffect(() => {
    startScanner(scannerRef.current, selectedCamera);
  }, [startScanner, selectedCamera]);

  // toggle torch (flash light)
  useEffect(() => {
    if (scannerRef.current?.getState() === 2) {
      console.log('toggle torch to be added later');
    }
  }, [openTorch]);

  // reset states when unmount
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

      setSelectedCamera('');
      setIsStarting(false);
      setIsScanning(false);
      setOpenTorch(false);
      setIsLoading(false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Backdrop
      open={isScanning}
      sx={{
        backdropFilter: 'blur(4px)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Typography
        variant='h2'
        sx={{
          position: 'absolute',
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          color: (theme) => theme.palette.white.main,
        }}
      >
        {t('title.scanQrCode')}
      </Typography>
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
      <Box
        sx={{
          position: 'absolute',
          bottom: 45,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          width: '100%',
          maxWidth: '500px',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ScannerButtons
          cameras={cameras}
          setSelectedCamera={setSelectedCamera}
        />
      </Box>
    </Backdrop>
  );
};

export default ScannerFull;
