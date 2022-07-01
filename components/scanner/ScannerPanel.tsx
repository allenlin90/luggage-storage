import { FC, useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Scanner, ScannerFull } from 'components';
import { useTranslation } from 'next-i18next';
import { Html5Qrcode } from 'html5-qrcode';

export const ScannerPanel: FC = () => {
  const { t } = useTranslation(['scanner', 'common']);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [data, setData] = useState<string>('');

  return (
    <>
      {isScanning && (
        <ScannerFull
          isScanning={isScanning}
          setIsScanning={setIsScanning}
          setIsStarting={setIsStarting}
          readData={setData}
        />
      )}
      <Box>
        <Button
          variant='contained'
          onClick={() => {
            setIsScanning((oldVal) => {
              if (!oldVal) {
                setIsStarting(true);
              }

              if (scannerRef.current && oldVal) {
                scannerRef.current.stop();
              }

              return !oldVal;
            });
          }}
          color={isScanning ? 'error' : 'primary'}
          disabled={isStarting}
        >
          {isScanning ? t('btn.stop') : t('btn.start')}
        </Button>
        <Typography>{data}</Typography>
        {/* <Scanner
          isScanning={isScanning}
          scannerRef={scannerRef}
          readData={setData}
          setIsStarting={setIsStarting}
        /> */}
      </Box>
    </>
  );
};

export default ScannerPanel;
