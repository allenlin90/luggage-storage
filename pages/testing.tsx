import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import Layout from 'components/common/Layout/Layout';
import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { pincodeState } from 'states';

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

  return (
    <>
      <Seo title="Testing" />
      <Button onClick={() => setOpen(true)}>Pincode</Button>
    </>
  );
};

TestingPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default TestingPage;
