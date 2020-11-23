import { SimplePaletteColorOptions } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';

export const StyledPersonalLinks = styled.div`
  ${({ theme }) => css`
    position: fixed;
    bottom: 10px;
    right: 10px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    border: 1px solid
      ${(theme.palette.primary as SimplePaletteColorOptions).main || '#37474f'};
    display: inline-grid;
    grid-column-gap: 10px;
    align-content: center;

    /* grid-template-columns: repeat(2, 1fr); */
    button.MuiIconButton-root {
      border-radius: 0%;
      a {
        font-size: 40px;
      }
    }
  `}
`;
