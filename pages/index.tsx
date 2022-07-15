import type { GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import getConfig from 'next/config';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const {
    publicRuntimeConfig: { local },
  } = getConfig();

  return {
    props: {
      local,
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

const HomePage: NextPage<{ local?: boolean }> = ({ local = false }) => {
  const { replace } = useRouter();

  useEffect(() => {
    if (local) {
      replace('/testing');
    } else {
      replace('/warehouse');
    }
  }, [replace, local]);

  return <Seo title="Home" />;
};

export default HomePage;
