import React from "react";
import GeolocatedMap from "components/Map/GeoLocatedMap";
import Menu from "./Menu";
import { StyledHeader } from "./Header.styles";
import { StyledNoMap } from "../Map/Map.styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useTranslate from "hooks/translate";

type Props = {
  disableMap?: boolean;
  children?: React.ReactNode;
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
      {!disableMap && (
        <div className="map-container" style={{ height: "100%" }}>
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
