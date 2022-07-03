import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Box, Button, IconButton, styled, Typography } from '@mui/material';

import dynamic from 'next/dynamic';
const ScannerFull = dynamic(() => import('./ScannerFull'), { ssr: false });
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner'),
  { ssr: false }
);

const Container = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ScannerPanel: FC = () => {
  console.log('panel render');
  const { t } = useTranslation(['scanner', 'common']);
  const router = useRouter();
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isDenied, setIsDenied] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setIsScanning(false);
      setIsDenied(false);
    };
  }, []);

  return (
    <>
      <ScannerFull
        isScanning={isScanning}
        setIsScanning={setIsScanning}
        setIsDenied={setIsDenied}
      />
      <Container>
        {isDenied ? (
          <Box>
            <Typography variant='body1'>{t('title.cameraDenied')}</Typography>
            <Button onClick={() => router.reload()}>{t('btn.reload')}</Button>
          </Box>
        ) : (
          <>
            <IconButton
              size='large'
              disabled={isScanning}
              sx={{
                width: '100%',
                height: '100%',
                maxWidth: '350px',
                maxHeight: '350px',
              }}
              onClick={() => {
                setIsScanning((oldVal) => !oldVal);
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
      </Container>
    </>
  );
};

export default ScannerPanel;
