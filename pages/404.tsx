import styled from '@emotion/styled';
import useTranslate from 'hooks/translate';
import Link from 'Link';
import Head from 'next/head';

const Styled404 = styled.div`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
`;

export default function Custom404() {
  const t = useTranslate();
  return (
    <Styled404>
      <Head>
        <title>Saad - {t('notFound')}</title>
      </Head>
      <h1>{t('errors.message404')}</h1>
      <p>
        {t('errors.backTo')} <Link href="/">{t('home')}</Link>
      </p>
    </Styled404>
  );
}
