import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import type { SessionProviderProps } from 'next-auth/react';
import type { DefaultSeoProps } from 'next-seo';
import { useState } from 'react';
import { DefaultSeoConfig } from 'next-seo.config';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import { theme } from 'styles';

import dynamic from 'next/dynamic';
const DefaultSeo = dynamic<DefaultSeoProps>(() =>
  import('next-seo').then((mod) => mod.DefaultSeo)
);
const RouteLoader = dynamic(() => import('../components/common/RouteLoader'));
const RecoilRoot = dynamic(() => import('../components/common/RecoilRoot'));
const SessionProvider = dynamic<SessionProviderProps>(() =>
  import('next-auth/react').then((mod) => mod.SessionProvider)
);
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
            <RouteLoader>{getLayout(<Component {...pageProps} />)}</RouteLoader>
          </RecoilRoot>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
