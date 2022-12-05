import { randomSort } from "./random-sort";

describe("randomSort", () => {
  beforeEach(() => {
    // this should reverse the array
    jest.spyOn(Math, "random").mockReturnValue(-1);
  });

  it("sorts the array randomly", () => {
    expect(randomSort([1, 2, 3, 4])).toEqual([4, 3, 2, 1]);
  });
});
