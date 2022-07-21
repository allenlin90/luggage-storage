import { ReactNode, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Seo from 'components/common/Seo';
import DrawerLayout from 'components/layouts/drawerLayout/DrawerLayout';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { components } from 'constants/components';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

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
      <List>
        {components.map(({ id, title, href }) => (
          <ListItem key={id} sx={{ justifyContent: 'center' }}>
            <Link href={`/components${href}`} passHref>
              <Button>
                <ListItemText>{title}</ListItemText>
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

TestingPage.getLayout = (page: ReactNode) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default TestingPage;
