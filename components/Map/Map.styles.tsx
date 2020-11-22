import styled, { css } from 'styled-components';

export const StyledMap = styled.div`
  ${({ theme }) => css`
    .leaflet-container {
      background-color: ${theme.palette.primary.main};
    }
  `}
`;

export const StyledNoMap = styled.div`
  height: 300px;
  background-color: #090909;
`;
