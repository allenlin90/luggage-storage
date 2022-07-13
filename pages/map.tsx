import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import Layout from 'components/layouts/Layout';
import Map from 'components/map/Map';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common', 'map']))),
    },
  };
};

export const MapPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="Map" />
      <Map />
    </>
  );
};

MapPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default MapPage;
