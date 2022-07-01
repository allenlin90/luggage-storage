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
import { Box, Button, MenuItem, Select } from '@mui/material';

export interface ScannerFullProps {
  isScanning?: boolean;
  setIsScanning?: Dispatch<SetStateAction<boolean>>;
  setIsStarting?: Dispatch<SetStateAction<boolean>>;
  readData?: Dispatch<SetStateAction<string>>;
}

export const ScannerFull: FC<ScannerFullProps> = ({
  isScanning = false,
  setIsScanning = () =>
    console.warn("no state setter is given to 'ScannerFull'"),
  setIsStarting = () =>
    console.warn("no state setter is given to 'ScannerFull'"),
  readData = () =>
    console.warn("no data state setter is given to 'ScannerFull'"),
}) => {
  const { width, height } = useWindowSize();
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  // const [openTorch, setOpenTorch] = useState<boolean>(false);

  const camConfig = useMemo(() => {
    return {
      fps: 2,
      // qrbox: width > 400 ? 250 : 180,
      qrbox: 250,
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
        if (scanner) {
          if (scanner.getState() === 2) {
            await scanner.stop();
            scanner.clear();
          }

          let camStarter: { [key: string]: any } = {
            facingMode: 'environment',
          };
          if (cameraId) {
            camStarter = { deviceId: { exact: cameraId } };
          }

          await scanner.start(camStarter, camConfig, onSuccess, onError);
        }
        setIsStarting(false);
      } catch (error: any) {
        console.log('something went wrong when starting camera');
        console.log(error.message || error);
      }
    },
    [setIsStarting, camConfig, readData]
  );

  const initScanner = useCallback(async () => {
    try {
      const cams = await Html5Qrcode.getCameras();
      if (cams.length) {
        setCameras(cams);
        const scanner = new Html5Qrcode('reader');
        scannerRef.current = scanner;
        startScanner(scanner);
        return;
      }

      throw new Error('no camera is available');
    } catch (error: any) {
      console.log('something went wrong when init qr reader');
      console.log(error.message || error);
    }
  }, [startScanner]);

  useEffect(() => {
    if (isScanning) {
      setOpenCamera(true);
      initScanner();
    }
  }, [initScanner, isScanning]);

  useEffect(() => {
    startScanner(scannerRef.current, selectedCamera);
  }, [startScanner, selectedCamera]);

  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.getState() === 2) {
        scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      }

      setSelectedCamera('');
      setOpenCamera(false);
      // setOpenTorch(false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backdropFilter: 'blur(4px)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box id='reader' sx={{ width: '100%', height: '100%' }} />
      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        {cameras.length > 1 && (
          <Select
            value={selectedCamera}
            onChange={(event) =>
              setSelectedCamera(event.target.value as string)
            }
          >
            {cameras.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        )}
        <Button
          variant='contained'
          onClick={() => {
            if (scannerRef.current && scannerRef.current.getState() === 2) {
              scannerRef.current.stop();
            }
            setIsScanning(false);
          }}
        >
          Stop
        </Button>
      </Box>
    </Box>
  );
};

export default ScannerFull;
