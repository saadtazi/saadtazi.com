import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import useTranslate from 'hooks/translate';
import { StyledMenu, StyledSmallMenu } from './Menu.styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';

const MyMenu: React.FC = () => {
  const t = useTranslate();
  const { locale, locales, pathname } = useRouter();
  const displayedLocales = (locales || []).filter((l) => l !== locale);

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
          {displayedLocales.map((l) => {
            return (
              <div key={l} className="language-selector">
                <Link key={l} href={pathname} locale={l}>
                  {l}
                </Link>
              </div>
            );
          })}
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
  const { locale, locales, pathname } = useRouter();
  const displayedLocales = (locales || []).filter((l) => l !== locale);

  const handleClose = () => setAnchorEl(null);
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
          <MenuItem onClick={handleClose} component={Link} href="/">
            {t('home')}
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} href="/murales">
            {t('murales.navItem')}
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} href="/stuff">
            {t('stuff')}
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} href="/minesweeper">
            {t('minesweeper.navItem')}
          </MenuItem>
          {displayedLocales.map((l) => {
            return (
              <MenuItem
                key={l}
                onClick={handleClose}
                component={Link}
                href={pathname}
                locale={l}
              >
                {l}
              </MenuItem>
            );
          })}
        </StyledSmallMenu>
      </Menu>
    </>
  );
};

export default MyMenu;
