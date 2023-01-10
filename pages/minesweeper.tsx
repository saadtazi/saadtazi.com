import { MineSweeper } from 'minesweeper/components/MineSweeper';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Header from 'components/Header/Header';
import Typography from '@mui/material/Typography';
import useTranslate from 'hooks/translate';
import PersonalLinks from 'components/PersonalLinks/PersonalLinks';
import { HeadTitle } from 'components/HeadTitle';

export default function MineSweeperPage() {
  const t = useTranslate();

  console.log('>> translate', typeof t('minesweeper.navItem'));

  return (
    <>
      <Head>
        <HeadTitle title={t('minesweeper.navItem')} />
      </Head>
      <Header disableMap={true}>
        <div className="hero-text">
          <Typography variant="h2" component="h2">
            {t('minesweeper.navItem')}
          </Typography>
        </div>
      </Header>
      <Container>
        <MineSweeper />
      </Container>
      <PersonalLinks />
    </>
  );
}
