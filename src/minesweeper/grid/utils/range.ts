export const range = (start: number, end: number): number[] => {
  if (end <= start) {
    throw new Error("invalid input: `end` cannot be `lower` than `start`");
  }
  return Array(end - start + 1)
    .fill(0)
    .map((_, index) => start + index);
};
