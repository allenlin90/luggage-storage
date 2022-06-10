import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Seo, Warehouse } from 'components';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'footer']))),
    },
  };
};

export const WarehousePage: NextPage = () => {
  return (
    <>
      <Seo title='Warehouse' />
      <Warehouse />
    </>
  );
};

export default WarehousePage;
