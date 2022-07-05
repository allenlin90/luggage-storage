import type { GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

const HomePage: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/warehouse');
  }, [push]);

  return <Seo title='Home' />;
};

export default HomePage;
