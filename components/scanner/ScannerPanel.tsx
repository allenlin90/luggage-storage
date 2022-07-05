import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  Box,
  Button,
  IconButton as MuiIconButton,
  styled,
  Typography,
} from '@mui/material';

import dynamic from 'next/dynamic';
// const ScannerFull = dynamic(() => import('./Scanner/ScannerFull'), {
//   ssr: false,
// });
const Scanner = dynamic(() => import('./Scanner/Scanner'), {
  ssr: false,
});
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

const cameraSize = '350px';

const IconButton = styled(MuiIconButton)(() => ({
  width: '100%',
  height: '100%',
  maxWidth: cameraSize,
  maxHeight: cameraSize,
}));

export const ScannerPanel: FC = () => {
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
      <Container>
        {isDenied ? (
          <Box>
            <Typography variant='body1'>{t('title.cameraDenied')}</Typography>
            <Button onClick={() => router.reload()}>{t('btn.reload')}</Button>
          </Box>
        ) : (
          <>
            {!isScanning ? (
              <IconButton
                size='large'
                disabled={isScanning}
                aria-label='qr-reader-button'
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
            ) : (
              <Scanner
                isScanning={isScanning}
                setIsScanning={setIsScanning}
                setIsDenied={setIsDenied}
                cameraSize={cameraSize}
              />
            )}
            {!isScanning && (
              <Typography sx={{ lineHeight: '40px' }}>
                {t('title.tapToScan')}
              </Typography>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ScannerPanel;
