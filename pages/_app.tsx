import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeoConfig } from 'next-seo.config';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import { theme } from 'styles';

import dynamic from 'next/dynamic';
const RecoilRoot = dynamic(() => import('../components/common/RecoilRoot'));
const RouteLoader = dynamic(() => import('../components/common/RouteLoader'));
const SessionChecker = dynamic(
  () => import('../components/common/SessionChecker')
);

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [refetchInterval, setRefetchInterval] = useState<number>(0);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <SessionProvider
        session={session}
        refetchOnWindowFocus
        refetchInterval={refetchInterval}
      >
        <ThemeProvider theme={theme}>
          <DefaultSeo {...DefaultSeoConfig} />
          <CssBaseline />
          <SessionChecker setter={setRefetchInterval} />
          <RecoilRoot>
            <RouteLoader>
              {/* <Layout> */}
              {getLayout(<Component {...pageProps} />)}
              {/* </Layout> */}
            </RouteLoader>
          </RecoilRoot>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
