import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import AugmentedReality from 'components/common/AugmentedReality';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { arState } from 'states';

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
  useEffect(() => {
    return () => setOpen(false);
  }, [setOpen]);

  return (
    <>
      <Seo title="Augmented Reality" />
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
