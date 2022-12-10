import React from 'react';
import Container from '@mui/material/Container';
import Header from 'components/Header/Header';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';
import MuraleMap from 'components/MuraleMap/MuraleMap';
import Typography from '@mui/material/Typography';
import Head from 'next/head';

import useTranslate from 'hooks/translate';
import { FormattedMessage } from 'react-intl';

export default function Index() {
  const t = useTranslate();
  return (
    <>
      <Head>
        <title>Saad Tazi - {t('murales.navItem')}</title>
      </Head>
      <Header disableMap={true}>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            Murales Montréal
          </Typography>
          <Typography component="h4" style={{ paddingBottom: 40 }}>
            <FormattedMessage
              id={'murales.from'}
              values={{
                link: (
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={t('murales.mtlDonneesOuvertesLink')}
                  >
                    {t('murales.mtlDonneesOuvertes')}
                  </a>
                ),
              }}
            />
          </Typography>
        </div>
      </Header>
      <Container>
        <MuraleMap />
      </Container>
      <PersonalLinks />
    </>
  );
}
