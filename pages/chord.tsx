import { ChordApp } from 'components/ChordApp';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Header from 'components/Header/Header';
import { getPageTitle } from 'components/Header';
import Typography from '@mui/material/Typography';
import useTranslate from 'hooks/translate';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';

export default function ChordPage() {
  const t = useTranslate();

  return (
    <>
      <Head>
        <title>{getPageTitle(t('chordPlayer.title'))}</title>
      </Head>
      <Header disableMap={true}>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            {t('chordPlayer.title')}
          </Typography>
        </div>
      </Header>
      <Container>
        <ChordApp />
      </Container>
      <PersonalLinks />
    </>
  );
}
