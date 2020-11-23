import styled from 'styled-components';
import useTranslate from 'hooks/translate';
import Link from 'src/Link';

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
      <h1>{t('errors.message404')}</h1>
      <p>
        {t('errors.backTo')} <Link href="/">{t('home')}</Link>
      </p>
    </Styled404>
  );
}
