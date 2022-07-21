import type { FC } from 'react';
import { Backdrop } from '@mui/material';
import { useRecoilState } from 'recoil';
import { arState } from 'states';
import { CancelBtn } from 'components/common/CancelBtn';

const AugmentedReality: FC = () => {
  const [open, setOpen] = useRecoilState(arState);

  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CancelBtn onClick={() => setOpen(false)} />
    </Backdrop>
  );
};

export default AugmentedReality;
