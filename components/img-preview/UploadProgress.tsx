import { FC, useState } from 'react';
import axios from 'axios';
import { useEffect, useCallback, useRef } from 'react';
import {
  Box,
  IconButton,
  Card,
  LinearProgress,
  Typography,
} from '@mui/material';
import { readFileAsync } from 'utils/uploadImg';

import dynamic from 'next/dynamic';
const CheckCircleIcon = dynamic(
  () => import('@mui/icons-material/CheckCircleOutline')
);
const HighlightOffIcon = dynamic(
  () => import('@mui/icons-material/HighlightOff')
);

export interface IUploadProgressProps {
  image: File;
}

export const UploadProgress: FC<IUploadProgressProps> = ({ image }) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const controllerRef = useRef<AbortController | null>(null);
  const uploaded = useRef<boolean>(false);

  const upload = useCallback(async () => {
    const controller = new AbortController();
    controllerRef.current = controller;
    const imgBase64 = await readFileAsync(image);
    const { status } = await axios.post<{ status: number }>(
      '/api/upload-img',
      { img: imgBase64 },
      {
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      }
    );

    if (status === 200) {
      setIsDone(true);
    }
  }, [image]);

  useEffect(() => {
    if (!uploaded.current) {
      upload();
      uploaded.current = true;
    }

    return () => {
      controllerRef.current = null;
      uploaded.current = false;
    };
  }, [upload]);

  return (
    <Card
      sx={{
        py: 1,
        px: 2,
      }}
    >
      <Typography
        sx={{
          display: 'inline-flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography component="span">{image.name}</Typography>
        &nbsp;
        <Typography component="span">
          {(image.size / 1024).toFixed(2)} KB
        </Typography>
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box>
          <Typography sx={{ whiteSpace: 'nowrap' }}>{progress} %</Typography>
        </Box>
        <Box sx={{ width: '100%', mx: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isDone ? (
            <CheckCircleIcon sx={{ color: 'green' }} />
          ) : (
            <IconButton onClick={() => controllerRef.current?.abort()}>
              <HighlightOffIcon sx={{ color: 'red' }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default UploadProgress;
