import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { arState, camerasState, selectedCameraState } from 'states';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { Button, MenuItem } from '@mui/material';

import dynamic from 'next/dynamic';
const Select = dynamic(() => import('@mui/material/Select'), { ssr: false });
const AugmentedReality = dynamic(
  () => import('components/ar/AugmentedReality'),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'dashboard']))),
    },
  };
};

export const TestingPage: NextPageWithLayout = () => {
  const setOpen = useSetRecoilState(arState);
  const cameras = useRecoilValue(camerasState);
  const [selectedCamera, setSelectedCamera] =
    useRecoilState(selectedCameraState);

  return (
    <>
      <Seo title="Augmented Reality" />
      <Select
        size="small"
        value={selectedCamera}
        onChange={(event) => setSelectedCamera(event.target.value as string)}
      >
        {cameras.map(({ id, label }) => (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        ))}
      </Select>
      <br />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Start
      </Button>
      <AugmentedReality />
    </>
  );
};

TestingPage.getLayout = (page: ReactNode) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default TestingPage;
