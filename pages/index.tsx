import React from 'react';
import useLocale from 'hooks/locale';
import Container from '@material-ui/core/Container';
import Header from 'components/Header/Header';
import Projects from 'components/Projects/Projects';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';
import { projects } from 'content/locale';
import { Locale } from 'types/models';

export default function Index() {
  const locale = useLocale();
  return (
    <>
      <Header />
      <Container>
        <Projects projects={projects[locale as Locale]} />
      </Container>
      <PersonalLinks />
    </>
  );
}
