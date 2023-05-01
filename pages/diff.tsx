import { DiffApp } from 'components/DiffApp';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Header from 'components/Header/Header';
import Typography from '@mui/material/Typography';
import useTranslate from 'hooks/translate';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';

export default function ChordPage() {
  const t = useTranslate();

  return (
    <>
      <Head>
        <title>
          {['Saad Tazi', t('diffTools.title')].filter((v) => !!v).join(' = ')}
        </title>
      </Head>
      <Header disableMap={true}>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            {t('diffTools.title')}
          </Typography>
        </div>
      </Header>
      <Container>
        <DiffApp />
      </Container>
      <PersonalLinks />
    </>
  );
}
