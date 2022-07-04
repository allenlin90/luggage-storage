import type { GetStaticProps } from 'next';
import type { ReactNode } from 'react';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from 'components/common/Layout/Layout';
import Seo from 'components/common/Seo';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

export const SettingsPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title='Settings' />
      Settings
    </>
  );
};

SettingsPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default SettingsPage;
