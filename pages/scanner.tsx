import { NextPage, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Seo, ScannerPanel } from 'components';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

export const ScannerPage: NextPage = () => {
  return (
    <>
      <Seo title='Scanner' />
      <ScannerPanel />
    </>
  );
};

export default ScannerPage;
