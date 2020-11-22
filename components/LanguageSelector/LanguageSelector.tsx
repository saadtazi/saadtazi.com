import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

const StyledLanguageSelector = styled.div`
  a {
    color: white;
    text-decoration: none;
  }
`;

const LanguageSelector = () => {
  const { locale, locales, pathname } = useRouter();
  const displayedLocales = (locales || []).filter((l) => l !== locale);
  if (displayedLocales.length === 0) {
    return null;
  }
  return (
    <StyledLanguageSelector>
      {displayedLocales.map((l) => {
        return (
          <div key={l}>
            <Link href={pathname} locale={l}>
              {l}
            </Link>
          </div>
        );
      })}
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;
