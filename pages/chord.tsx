import { ChordApp } from 'components/ChordApp';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Header from 'components/Header/Header';
import Typography from '@mui/material/Typography';
import useTranslate from 'hooks/translate';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';
import { HeadTitle } from 'components/HeadTitle';

export default function ChordPage() {
  const t = useTranslate();

  return (
    <>
      <Head>
        <HeadTitle title="Chord Player" />
      </Head>
      <Header disableMap={true}>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            {'Chord'}
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
