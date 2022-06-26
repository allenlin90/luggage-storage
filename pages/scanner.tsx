import { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Scanner } from 'components';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

export const ScannerPage: NextPage = () => {
  return <Scanner />;
};

export default ScannerPage;
