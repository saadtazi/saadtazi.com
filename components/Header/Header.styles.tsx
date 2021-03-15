import styled, { css } from 'styled-components';

export const StyledHeader = styled.div`
  ${({ theme }) => css`

    background-color: #000;

    .top-nav .title {
      flex-grow: 1;
    }
    .map-container {
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
    .hero-text .MuiTypography-root {
      color: #73828b;
      text-shadow: 1px 1px 2px #73828b;
      margin-bottom: 40px;
      padding-left: 20px;
    }
    .links a {
      padding: 20px;
    }
    a {
      color: white;
      font-size: 2em;
      text-decoration: none;
    }
    .language-selector {
      padding-left: 20px;
      /* right: 20; */
    }
  `}
`;
