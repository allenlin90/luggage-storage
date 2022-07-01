import {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera } from 'types';
import { Box, Select, MenuItem } from '@mui/material';
import { useWindowSize } from 'react-use';

export interface ScannerProps {
  isScanning: boolean;
  readData?: (data: string) => void;
  setIsStarting?: Dispatch<SetStateAction<boolean>>;
  scannerRef?: MutableRefObject<Html5Qrcode | null>;
}

export const Scanner: FC<ScannerProps> = ({
  isScanning,
  readData,
  setIsStarting,
  scannerRef,
}) => {
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const { width } = useWindowSize();

  const camConfig = useMemo(() => {
    return {
      fps: 2,
      qrbox: width > 400 ? 250 : 180,
      aspectRatio: 4 / 3,
    };
  }, [width]);

  const onSuccess = useCallback(
    (decodedText: string) => {
      if (readData) {
        readData(decodedText);
      }
    },
    [readData]
  );

  const onError = useCallback((errorMessage: string) => {
    setIsError(true);
  }, []);

  const initScanner = useCallback(async () => {
    try {
      const cams = await Html5Qrcode.getCameras();
      setCameras(cams);
      if (cams.length) {
        setSelectedCamera(cams[0].id);
        const scanner = new Html5Qrcode('reader');
        setScanner(scanner);
        if (scannerRef) {
          scannerRef.current = scanner;
        }
        await scanner.start(
          { facingMode: 'environment' },
          camConfig,
          onSuccess,
          onError
        );

        if (setIsStarting) {
          setIsStarting(false);
        }
      }
    } catch (error: any) {
      console.log('something went wrong when init qr scanner');
      console.log(error?.message || error);
    }
  }, [onSuccess, onError, scannerRef, setIsStarting, camConfig]);

  useEffect(() => {
    if (isScanning) {
      initScanner();
    }

    return () => {
      setScanner(null);
      setCameras([]);
      setIsError(false);
      setSelectedCamera('');
    };
  }, [isScanning, initScanner]);

  useEffect(() => {
    return () => {
      if (scanner && scanner.getState() === 2) {
        // stop scanner when navigate out from page
        // and if the scanner is running
        scanner.stop();
      }
    };
  }, [scanner]);

  return (
    <>
      {isScanning && cameras.length > 0 && (
        <Select
          value={selectedCamera}
          size='small'
          onChange={(event) => {
            const cameraId = event.target.value as string;
            setSelectedCamera(cameraId);
            if (scanner) {
              if (setIsStarting) {
                setIsStarting(true);
              }
              scanner.stop().then(() => {
                scanner.clear();
                scanner
                  .start(cameraId, camConfig, onSuccess, onError)
                  .then(() => {
                    if (setIsStarting) {
                      setIsStarting(false);
                    }
                  });
              });
            }
          }}
        >
          {cameras.map(({ id, label }) => {
            return (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      )}
      <Box
        id='reader'
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          marginX: 'auto',
        }}
      />
    </>
  );
};

export default Scanner;
