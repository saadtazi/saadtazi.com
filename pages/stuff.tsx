import React from 'react';
import Container from '@mui/material/Container';
import Header from 'components/Header/Header';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';
import RandomStuff from 'components/RandomStuff/RandomStuff';
import Typography from '@mui/material/Typography';
import Head from 'next/head';

import useTranslate from 'hooks/translate';

export default function Index() {
  const t = useTranslate();
  return (
    <>
      <Head>
        <title>Saad Tazi - {t('stuff')}</title>
      </Head>
      <Header>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            {t('hero.hello')}
          </Typography>
          <Typography component="h4">{t('hero.helloDescription')}</Typography>
        </div>
      </Header>
      <Container>
        <RandomStuff />
      </Container>
      <PersonalLinks />
    </>
  );
}
