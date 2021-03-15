import React from 'react';
import GeolocatedMap from 'components/Map/GeoLocatedMap';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';
import { StyledHeader } from './Header.styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import useTranslate from 'hooks/translate';

type Props = {
  disableMap?: boolean;
};

const Header: React.FC<Props> = ({ disableMap, children }) => {
  const t = useTranslate();
  return (
    <StyledHeader>
      <AppBar position="static" className="top-nav" color="transparent">
        <Toolbar>
          <div className="title">
            <Link href="/">{t('home')}</Link>
          </div>
          <div className="links">
            <Link href="/murales">{t('murales.navItem')}</Link> -
          </div>
          <div className="links">
            <Link href="/stuff">{t('stuff')}</Link> -
          </div>
          <div className="language-selector">
            <LanguageSelector />
          </div>
        </Toolbar>
      </AppBar>
      {!disableMap && (
        <div className="map-container">
          <div className="map">
            <GeolocatedMap />
          </div>
        </div>
      )}
      {children}
    </StyledHeader>
  );
};

export default Header;
