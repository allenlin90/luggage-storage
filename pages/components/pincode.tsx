import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSetRecoilState } from 'recoil';
import { pincodeState } from 'states';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { Button, Divider, Typography } from '@mui/material';
import { useTest } from 'hooks/test';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'dashboard']))),
    },
  };
};

export const TestingPage: NextPageWithLayout = () => {
  const setOpen = useSetRecoilState(pincodeState);
  const [, setTest] = useTest();

  useEffect(() => {
    setTest(true);
  }, [setTest]);

  return (
    <>
      <Seo title="Pincode" />
      <>
        <Typography component="h1">Pincode</Typography>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </>
      <Divider />
    </>
  );
};

TestingPage.getLayout = (page: ReactNode) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default TestingPage;
