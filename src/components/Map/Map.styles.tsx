import { SimplePaletteColorOptions } from "@mui/material/styles";
import styled from "@emotion/styled";

export const StyledMap = styled.div`
  ${({ theme }) => `
    .leaflet-container {
      background-color: ${
        (theme.palette.primary as SimplePaletteColorOptions).main || "#37474f"
      };
    }
  `}
`;

export const StyledNoMap = styled.div`
  height: 200px;
  background-color: #090909;
`;
