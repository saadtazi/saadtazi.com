import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

export const StyledHeader = styled('div')`
  ${({ theme }: { theme: Theme }) => `
  .top-nav {
    background-color: #090909;
    .title {
      flex-grow: 1;
    }
  }
  
  .map-container {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
  
  .no-map {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
  
  .map {
    min-width: 100%;
    .leaflet-control-attribution {
      a {
        font-size: 1em;
        color: white;
      }
    }
  }
  .MuiToolbar-root {
    color: white;
  }
  .hero-text {
    color: #090909;
    ${theme?.breakpoints?.down?.('xs')} {
      h2 {
        font-size: 2.75em;
      }
    }
    a {
      color: #090909;
    }
  
    .MuiTypography-root {
      color: #73828b;
      text-shadow: 1px 1px 2px #73828b;
      margin-bottom: 40px;
      padding-left: 20px;
    }
  }
  .links a {
    padding: 20px;
  }
  
  a {
    color: white;
    text-decoration: none;
  }
    font-size: 2em;
  
  
  ${theme.breakpoints.down('md')} {
      font-size: 1.2em;
  }
  
  
  
  `}
`;
