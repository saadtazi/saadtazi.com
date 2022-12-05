import styled from "@emotion/styled";

export const StyledProjects = styled.div`
  ${({ theme }) => ``}
`;

export const StyledProject = styled.div`
  ${({ theme }) => `
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
