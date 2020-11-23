import React from 'react';
import useLocale from 'hooks/locale';
import Container from '@material-ui/core/Container';
import Header from 'components/Header/Header';
import Projects from 'components/Projects/Projects';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';
import { projects } from 'content/locale';
import { Locale } from 'types/models';
import Typography from '@material-ui/core/Typography';

import useTranslate from 'hooks/translate';

export default function Index() {
  const locale = useLocale();
  const t = useTranslate();
  return (
    <>
      <Header>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            {t('hero.hello')}
          </Typography>
          <Typography component="h4">{t('hero.helloDescription')}</Typography>
        </div>
      </Header>
      <Container>
        <Projects projects={projects[locale as Locale]} />
      </Container>
      <PersonalLinks />
    </>
  );
}
