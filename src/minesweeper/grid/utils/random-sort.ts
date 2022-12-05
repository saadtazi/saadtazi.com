export const randomSort = <T>(list: T[]) => {
  return list.sort(() => Math.random() - 0.5);
};
