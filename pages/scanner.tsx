import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import Layout from 'components/common/Layout/Layout';
<<<<<<< HEAD
import Scanner from 'components/scanner/Scanner';
=======
import ScannerPanel from 'components/scanner/ScannerPanel';
>>>>>>> develop

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
<<<<<<< HEAD
      <Scanner />
=======
      <ScannerPanel />
>>>>>>> develop
    </>
  );
};

ScannerPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default ScannerPage;
