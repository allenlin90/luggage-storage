import { FC, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { pincodeAuthState } from 'states';
import { Box } from '@mui/material';
import PincodeDots from './PincodeDots';
import PincodeButtons from './PincodeButtons';

import dynamic from 'next/dynamic';
const LockIcon = dynamic(() => import('@mui/icons-material/Lock'), {
  ssr: false,
});

const maxWidth = '500px';

export const PincodePanel: FC = () => {
  const [pincode, setPincode] = useState<string[]>([]);
  const [digits, setDigits] = useState<number>(4);
  const pincodeRef = useRef(pincode);
  const [isError, setIsError] = useState<boolean>(false);
  const pincodeAuth = useRecoilValue(pincodeAuthState);

  useEffect(() => {
    pincodeRef.current = pincode;
    if (isError) {
      setIsError(false);
    }

    if (pincode.length === 4) {
      console.log('verification logic');
      const code = pincode.join('');
      if (code !== '0000') {
        setIsError(true);
      } else {
        pincodeAuth();
      }
    }
  }, [pincode, isError, pincodeAuth]);

  useEffect(() => {
    return () => {
      setPincode([]);
      pincodeRef.current = [];
      setIsError(false);
      setDigits(4);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Box width="100%" height="100%" sx={{ maxWidth, padding: '2rem' }}>
      <LockIcon sx={{ color: (theme) => theme.palette.white.main }} />
      <PincodeDots pincode={pincode} isError={isError} digits={digits} />
      <PincodeButtons
        setPincode={setPincode}
        pincodeRef={pincodeRef}
        digits={digits}
      />
    </Box>
  );
};

export default PincodePanel;
