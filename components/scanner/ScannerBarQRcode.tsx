import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { Button, Backdrop, styled } from '@mui/material';
import MuiPaper from '@mui/material/Paper';
import { useWindowSize } from 'react-use';

const Paper = styled(MuiPaper)(() => ({
  '& video': {
    // objectFit: 'inherit',
  },
}));

const BarcodeScannerComponent = dynamic(
  () => import('react-qr-barcode-scanner'),
  { ssr: false }
);

export const ScannerBarQRcode: FC = () => {
  const [data, setData] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openTorch, setOpenTorch] = useState<boolean>(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    return () => {
      setIsScanning(false);
    };
  }, []);

  return (
    <>
      <Button
        variant='contained'
        onClick={() => {
          setOpenModal(true);
          setTimeout(() => setIsScanning(true), 0);
        }}
      >
        Toggle
      </Button>
      <Backdrop
        open={openModal}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Paper sx={{ width: '100%', height: '100%', position: 'relative' }}>
          {openModal && (
            <BarcodeScannerComponent
              facingMode='environment'
              onUpdate={(_err, data) => {
                if (data) {
                  setData(data.getText());
                }
              }}
              onError={(err) => {
                console.log('something went wrong when scanning');
                console.warn(err);
              }}
              torch={openTorch}
              stopStream={!isScanning}
              videoConstraints={{ aspectRatio: width / height }}
            />
          )}
          <Button
            variant='contained'
            onClick={() => {
              setOpenModal(false);
              setTimeout(() => setIsScanning(false), 0);
            }}
            sx={{
              position: 'fixed',
              bottom: 20,
              zIndex: 1,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Close
          </Button>
        </Paper>
      </Backdrop>
    </>
  );
};

export default ScannerBarQRcode;
