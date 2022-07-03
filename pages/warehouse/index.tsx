import type { ReactNode } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { WarehouseProvider } from 'context';
import { Layout, Seo, Warehouse } from 'components';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

export const WarehousePage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title='Warehouse' />
      <WarehouseProvider>
        <Warehouse />
      </WarehouseProvider>
    </>
  );
};

WarehousePage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default WarehousePage;
