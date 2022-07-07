import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import Layout from 'components/common/Layout/Layout';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'dashboard']))),
    },
  };
};

export const TestingPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title='Testing' />
    </>
  );
};

TestingPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default TestingPage;
