import type { AppProps } from 'next/app';
import { useState } from 'react';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeoConfig } from 'next-seo.config';
import { ThemeProvider } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import { theme } from 'styles';

import dynamic from 'next/dynamic';
const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'));
const SessionChecker = dynamic(
  () => import('../components/common/SessionChecker')
);
const RecoilRootWrapper = dynamic(
  () => import('../components/common/RecoilRoot')
);
const RouteLoader = dynamic(() => import('../components/common/RouteLoader'));
const Layout = dynamic(() => import('../components/common/Layout/Layout'));

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [refetchInterval, setRefetchInterval] = useState<number>(0);

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
          <RecoilRootWrapper>
            <RouteLoader>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RouteLoader>
          </RecoilRootWrapper>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
