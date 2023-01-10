import { TunerApp } from 'components/TunerApp';
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
        <HeadTitle title={t('tuner.title')} />
      </Head>
      <Header disableMap={true}>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            {t('tuner.title')}
          </Typography>
        </div>
      </Header>
      <Container>
        <TunerApp />
      </Container>
      <PersonalLinks />
    </>
  );
}
