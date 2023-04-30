import { SimplePaletteColorOptions } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export const ValueError = styled('div')(({ theme }) => ({
  color: (theme.palette.error as SimplePaletteColorOptions).main,
}));
