import React from 'react';
import useLocale from 'hooks/locale';
import Container from '@material-ui/core/Container';
import Header from 'components/Header/Header';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';
import MuraleMap from 'components/MuraleMap/MuraleMap';
import Typography from '@material-ui/core/Typography';

import useTranslate from 'hooks/translate';
import { FormattedMessage } from 'react-intl';

export default function Index() {
  const locale = useLocale();
  const t = useTranslate();
  return (
    <>
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
                  <a target="_blank" href={t('murales.mtlDonneesOuvertesLink')}>
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
