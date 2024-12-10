import Head from 'next/head';
import Container from '@mui/material/Container';
import Header from 'components/Header/Header';
import Typography from '@mui/material/Typography';
import useTranslate from 'hooks/translate';
import HanoiTower from 'components/HanoiTower/HanoiTower';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';
import Grid from '@mui/material/Grid2'; // Grid version 2
import { HanoiTowerRules } from 'components/HanoiTower/Rules';

export default function ChordPage() {
  const t = useTranslate();

  return (
    <>
      <Head>
        <title>
          {['Saad Tazi', t('hanoiTower.title')].filter((v) => !!v).join(' = ')}
        </title>
      </Head>
      <Header disableMap>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            {t('hanoiTower.title')}
          </Typography>
        </div>
      </Header>
      <Container>
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <HanoiTowerRules />
          </Grid>
          <Grid size={{ xs: 12 }} style={{ marginTop: 20 }}>
            <HanoiTower />
          </Grid>
        </Grid>
      </Container>
      <PersonalLinks />
    </>
  );
}
