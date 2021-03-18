import React from 'react';
import GeolocatedMap from 'components/Map/GeoLocatedMap';
import Menu from './Menu';
import { StyledHeader } from './Header.styles';
import { StyledNoMap } from '../Map/Map.styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
          <Menu />
        </Toolbar>
      </AppBar>
      {disableMap ? (
        <div className="no-map">
          <StyledNoMap />
        </div>
      ) : (
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
