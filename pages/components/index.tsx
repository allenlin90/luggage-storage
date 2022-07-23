import type { ReactNode } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import { useEffect } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import ComponentList from 'components/ComponentList';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'dashboard']))),
    },
  };
};

export const TestingPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    publicRuntimeConfig: { production },
  } = getConfig();

  useEffect(() => {
    if (production) {
      router.replace('/');
    }
  }, [production, router]);
  return (
    <>
      <Seo title="Components" />
      <ComponentList />
    </>
  );
};

TestingPage.getLayout = (page: ReactNode) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default TestingPage;
