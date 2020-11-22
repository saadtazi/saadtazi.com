import styled, { css } from 'styled-components';

export const StyledHeader = styled.div`
  ${({ theme }) => css`
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
    }
    .hero-text {
      color: #73828b;
      margin-bottom: 40px;
      padding-left: 20px;
    }
    .language-selector {
      color: white;
      /* flex-grow: 1; */
      font-size: 2em;
      right: 20;
    }
  `}
`;
