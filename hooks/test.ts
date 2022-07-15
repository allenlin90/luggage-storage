import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export const useTest = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [test, setTest] = useState(false);

  useEffect(() => {
    return () => {
      setTest(false);
    };
  }, []);

  return [test, setTest];
};

export default useTest;
