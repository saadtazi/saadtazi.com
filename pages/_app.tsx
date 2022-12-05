import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { localesData, LocalesData, flattenMessages } from "content/locale";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "theme";
import createEmotionCache from "createEmotionCache";
import * as gtag from "gtag";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { locale, defaultLocale, events: routerEvents } = useRouter();
  const currentLocale = (locale || defaultLocale || "en") as keyof LocalesData;
  const messages = flattenMessages(localesData[currentLocale]);

  React.useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    routerEvents.on("routeChangeComplete", handleRouteChange);
    return () => {
      routerEvents.off("routeChangeComplete", handleRouteChange);
    };
  }, [routerEvents]);
  return (
    <CacheProvider value={emotionCache}>
      <IntlProvider
        locale={currentLocale as string}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </CacheProvider>
  );
}
