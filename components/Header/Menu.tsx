import React from 'react';
import { Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';
import useTranslate from 'hooks/translate';
import Hidden from '@material-ui/core/Hidden';
import { StyledMenu, StyledSmallMenu } from './Menu.styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MyMenu: React.FC = () => {
  const t = useTranslate();
  return (
    <Toolbar>
      <Hidden xsDown implementation="css">
        <StyledMenu>
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
        </StyledMenu>
      </Hidden>
      <Hidden smUp implementation="css">
        <SmallMenu />
      </Hidden>
    </Toolbar>
  );
};

const SmallMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const t = useTranslate();

  const handleClose = (e: React.MouseEvent) => setAnchorEl(null);
  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledSmallMenu>
          <MenuItem onClick={handleClose} href="/">
            <Link href="/">{t('home')}</Link>
          </MenuItem>
          <MenuItem onClick={handleClose} href="/">
            <Link href="/murales">{t('murales.navItem')}</Link>
          </MenuItem>
          <MenuItem onClick={handleClose} href="/">
            <Link href="/stuff">{t('stuff')}</Link>
          </MenuItem>
        </StyledSmallMenu>
      </Menu>
    </>
  );
};

export default MyMenu;
