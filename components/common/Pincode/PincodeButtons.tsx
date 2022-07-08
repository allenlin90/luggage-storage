import type { Dispatch, FC, SetStateAction, MutableRefObject } from 'react';
import { useEffect, memo } from 'react';
import { v4 } from 'uuid';
import {
  Box,
  Button as MuiButton,
  Typography as MuiTypography,
  IconButton,
  styled,
} from '@mui/material';

import dynamic from 'next/dynamic';
const BackspaceIcon = dynamic(() => import('@mui/icons-material/Backspace'));
const PersonIcon = dynamic(() => import('@mui/icons-material/Person'));

const Button = styled(MuiButton)(() => ({
  fontSize: '1.2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  width: '3rem',
  minWidth: '3rem',
  height: '3rem',
  borderRadius: '50%',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.white.main,
  fontSize: '1.125rem',
}));

export interface PincodeButtonsProps {
  setPincode: Dispatch<SetStateAction<string[]>>;
  pincodeRef?: MutableRefObject<string[]>;
  numbers?: number[];
  digits?: number;
}

const Component: FC<PincodeButtonsProps> = ({
  setPincode,
  pincodeRef = { current: [] },
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  digits = 4,
}) => {
  const setPin = (num: number) => {
    if (pincodeRef.current.length < digits) {
      setPincode((list) => {
        if (list.length < digits) {
          return [...list, num.toString()];
        }
        return [...list];
      });
    }
  };

  const removePin = () =>
    setPincode((pincode) => {
      if (!pincode.length) {
        return pincode;
      }
      return pincode.slice(0, pincode.length - 1);
    });

  const keyDownHandler = (event: KeyboardEvent) => {
    if (pincodeRef.current.length < digits) {
      if (!Number.isNaN(parseInt(event.key))) {
        setPin(parseInt(event.key));
      }
    }

    if (event.key === 'Backspace') {
      removePin();
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', keyDownHandler);
    }

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        justifyItems: 'center',
        gap: '2rem',
        maxWidth: '13.5rem',
        marginX: 'auto',
        marginTop: '2.5rem',
      }}
    >
      {numbers.map((num) => (
        <Button key={v4() + num} onClick={() => setPin(num)}>
          <Typography>{num}</Typography>
        </Button>
      ))}
      <IconButton onClick={() => removePin()}>
        <BackspaceIcon sx={{ color: (theme) => theme.palette.white.main }} />
      </IconButton>
      <Button onClick={() => setPin(0)}>
        <Typography>0</Typography>
      </Button>
      <IconButton>
        <PersonIcon sx={{ color: (theme) => theme.palette.white.main }} />
      </IconButton>
    </Box>
  );
};

export const PincodeButtons = memo(Component);
export default PincodeButtons;
