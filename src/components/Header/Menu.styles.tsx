import styled from "@emotion/styled";

export const StyledMenu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;

  .title {
    flex-grow: 1;
  }

  .language-selector {
    padding-left: 20px;
  }
`;

export const StyledSmallMenu = styled.div`
  a {
    color: inherit;
  }
`;
