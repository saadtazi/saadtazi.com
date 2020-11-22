import styled, { css } from 'styled-components';

export const StyledProjects = styled.div`
  ${({ theme }) => css``}
`;

export const StyledProject = styled.div`
  ${({ theme }) => css`
    /* height: 100%; */
    .MuiCard-root {
      /* height: 100%; */
    }

    .tags {
      .MuiChip-root {
        margin-right: 5px;
      }
    }
  `}
`;
