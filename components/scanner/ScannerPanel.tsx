import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Button, IconButton, Typography } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ScannerFull = dynamic(() => import('./ScannerFull'));

export const ScannerPanel: FC = () => {
  const { t } = useTranslation(['scanner', 'common']);
  const router = useRouter();
  const [data, setData] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [isDenied, setIsDenied] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setData('');
      setIsScanning(false);
      setIsStarting(false);
      setIsDenied(false);
    };
  }, []);

  return (
    <>
      <ScannerFull
        isScanning={isScanning}
        setIsScanning={setIsScanning}
        setIsStarting={setIsStarting}
        setIsDenied={setIsDenied}
        readData={setData}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'inline-flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isDenied ? (
          <Box>
            <Typography variant='body1'>{t('title.cameraDenied')}</Typography>
            <Button onClick={() => router.reload()}>{t('btn.reload')}</Button>
          </Box>
        ) : (
          <>
            <IconButton
              size='large'
              disabled={isStarting}
              sx={{
                width: '100%',
                height: '100%',
                maxWidth: '350px',
                maxHeight: '350px',
              }}
              onClick={() => {
                setIsScanning((oldVal) => {
                  if (!oldVal) {
                    setIsStarting(true);
                  }

                  return !oldVal;
                });
              }}
            >
              <QrCodeScannerIcon
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </IconButton>
            <Typography
              variant='h1'
              sx={{
                color: (theme) => theme.palette.darkGrey.main,
              }}
            >
              {t('title.tapToScan')}
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default ScannerPanel;
