import { range } from "./range";

describe("range", () => {
  describe("if `end` is `lower` than `start`", () => {
    it("throws an error", () => {
      expect(() => {
        range(10, 1);
      }).toThrow();
    });
  });

  const testCases: [start: number, end: number, expected: number[]][] = [
    [-2, 2, [-2, -1, 0, 1, 2]],
    [0, 3, [0, 1, 2, 3]],
    [5, 8, [5, 6, 7, 8]],
  ];

  describe.each(testCases)(
    "when called with valid values",
    (start, end, expectedResults) => {
      it("returns expected value", () => {
        expect(range(start, end)).toEqual(expectedResults);
      });
    }
  );
});
