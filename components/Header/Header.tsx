import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useTranslate from 'hooks/translate';
import GeolocatedMap from 'components/Map/GeoLocatedMap';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';
import { StyledHeader } from './Header.styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Header: React.FC = () => {
  const t = useTranslate();
  return (
    <StyledHeader>
      <AppBar position="static" className="top-nav" color="transparent">
        <Toolbar>
          <div className="title"> </div>
          <div className="language-selector">
            <LanguageSelector />
          </div>
        </Toolbar>
      </AppBar>
      <div className="map-container">
        <div className="map">
          <GeolocatedMap />
        </div>
      </div>
      <div className="hero-text">
        <Typography variant="h2" component="h2">
          {t('hello')}
        </Typography>
        <Typography component="h4">{t('description')}</Typography>
      </div>
    </StyledHeader>
  );
};

export default Header;
