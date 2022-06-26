import { useState } from 'react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeoConfig } from 'next-seo.config';
import { theme } from 'styles';
import { RouteLoader, Layout, SessionChecker } from 'components';
import { CssBaseline } from '@mui/material';

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
          <RouteLoader>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RouteLoader>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
