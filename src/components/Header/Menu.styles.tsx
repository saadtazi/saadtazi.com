import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

export const StyledMenu = styled('div')`
  ${({ theme }: { theme: Theme }) => `
  display: flex;
  width: 100%;
  flex-direction: row;

  .title {
    flex-grow: 1;
    [theme.breakpoints.down('sm')]: {
      font: 0.8em;
    },
  }

  .language-selector {
    padding-left: 20px;
  }
`}
`;

export const StyledSmallMenu = styled('div')`
  a {
    color: inherit;
  }
`;
