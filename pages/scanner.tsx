import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Seo, ScannerPanel, Layout } from 'components';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

export const ScannerPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title='Scanner' />
      <ScannerPanel />
    </>
  );
};

ScannerPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default ScannerPage;
