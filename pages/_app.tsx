import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import { localesData, LocalesData, flattenMessages } from 'content/locale';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'src/theme';

type MyAppProp = {
  Component: React.ElementType;
  pageProps: any;
};
const MyApp: React.FC<MyAppProp> = (props) => {
  const { Component, pageProps } = props;
  const { locale, defaultLocale } = useRouter();
  const currentLocale = (locale || defaultLocale || 'en') as keyof LocalesData;
  const messages = flattenMessages(localesData[currentLocale]);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <IntlProvider
        locale={locale as string}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <Head>
          <title>Saad Tazi</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <MUIThemeProvider theme={theme}>
          <SCThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </SCThemeProvider>
        </MUIThemeProvider>
      </IntlProvider>
    </React.Fragment>
  );
};

export default MyApp;
