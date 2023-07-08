import type { ReactElement, ReactNode } from "react";
// import { Analytics } from '@vercel/analytics/react';
// const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;
import { useRouter } from "next/router";
import {useEffect} from "react"


import Script from "next/script";
import type { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { baselightTheme } from "../src/theme/DefaultColors";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = baselightTheme;

  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();
  useEffect(() => {
    // Trigger the pageview event when the route changes
    const handleRouteChange = (url: string) => {
      window.gtag('config', 'G-QN2BDKE9WT', {
        page_path: url,
      });
    };

    // Add event listener for route changes
    const router = require('next/router');
    router.events.on('routeChangeComplete', handleRouteChange);

    // Remove event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);



  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Modernize NextJs Free Admin template</title>
      </Head>
      {/* <Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-QN2BDKE9WT`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-QN2BDKE9WT');
  `}
</Script> */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}

      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
