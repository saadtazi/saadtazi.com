import styled from "@emotion/styled";

export const StyledMuraleMap = styled.div<{
  withMurale: boolean;
  windowHeight: number;
}>`
  display: grid;
  grid-template-columns: 1fr ${({ withMurale }) => (withMurale ? "1fr" : "")};
  column-gap: 20px;
  height: ${({ windowHeight }) =>
    `${windowHeight > 600 ? windowHeight - 400 : 400}px`};
  map {
    height: ${({ windowHeight }) =>
      `${windowHeight > 600 ? windowHeight - 400 : 400}px`};
  }
`;
