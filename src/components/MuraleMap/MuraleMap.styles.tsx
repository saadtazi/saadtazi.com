import styled from '@emotion/styled';

export const StyledMuraleMap = styled.div<{
  withMurale: boolean;
  windowHeight: number;
}>`
  .map {
    height: ${({ windowHeight }) =>
      `${windowHeight > 600 ? windowHeight - 400 : 400}px`};
  }
`;
