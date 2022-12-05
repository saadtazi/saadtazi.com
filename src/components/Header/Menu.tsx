import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';
import useTranslate from 'hooks/translate';
import { StyledMenu, StyledSmallMenu } from './Menu.styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MyMenu: React.FC = () => {
  const t = useTranslate();
  return (
    <Toolbar>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <StyledMenu>
          <div className="title links">
            <Link href="/">{t('home')}</Link>
          </div>
          -
          <div className="links">
            <Link href="/murales">{t('murales.navItem')}</Link>
          </div>
          -
          <div className="links">
            <Link href="/stuff">{t('stuff')}</Link>
          </div>
          -
          <div className="links">
            <Link href="/minesweeper">{t('minesweeper.navItem')}</Link>
          </div>
          -
          <div className="language-selector">
            <LanguageSelector />
          </div>
        </StyledMenu>
      </Box>
      <Box sx={{ display: { xs: 'display', sm: 'none' } }}>
        <SmallMenu />
      </Box>
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
          <MenuItem onClick={handleClose} href="/">
            <Link href="/minesweeper">{t('minesweeper.navItem')}</Link>
          </MenuItem>
          <MenuItem onClick={handleClose} href="/">
            <LanguageSelector />
          </MenuItem>
        </StyledSmallMenu>
      </Menu>
    </>
  );
};

export default MyMenu;
