const { binarySearch, lowerBound, upperBound } = require("../src/search/binarySearch");

describe("binarySearch", () => {
  test("finds element in sorted array", () => {
    const arr = [1, 3, 5, 7, 9, 11];
    expect(binarySearch(arr, 5)).toBe(2);
    expect(binarySearch(arr, 1)).toBe(0);
    expect(binarySearch(arr, 11)).toBe(5);
  });

  test("returns -1 for missing element", () => {
    const arr = [1, 3, 5, 7, 9];
    expect(binarySearch(arr, 4)).toBe(-1);
    expect(binarySearch(arr, 0)).toBe(-1);
    expect(binarySearch(arr, 10)).toBe(-1);
  });

  test("handles empty array", () => {
    expect(binarySearch([], 5)).toBe(-1);
  });

  test("handles single element array", () => {
    expect(binarySearch([5], 5)).toBe(0);
    expect(binarySearch([5], 3)).toBe(-1);
  });
});

describe("lowerBound", () => {
  test("finds first element >= target", () => {
    const arr = [1, 2, 4, 4, 4, 6, 8];
    expect(lowerBound(arr, 4)).toBe(2);
    expect(lowerBound(arr, 5)).toBe(5);
    expect(lowerBound(arr, 1)).toBe(0);
  });

  test("returns length if all elements smaller", () => {
    const arr = [1, 2, 3];
    expect(lowerBound(arr, 10)).toBe(3);
  });

  test("returns 0 if all elements >= target", () => {
    const arr = [5, 6, 7];
    expect(lowerBound(arr, 2)).toBe(0);
  });
});

describe("upperBound", () => {
  test("finds first element > target", () => {
    const arr = [1, 2, 4, 4, 4, 6, 8];
    expect(upperBound(arr, 4)).toBe(5);
    expect(upperBound(arr, 3)).toBe(2);
    expect(upperBound(arr, 0)).toBe(0);
  });

  test("returns length if all elements <= target", () => {
    const arr = [1, 2, 3];
    expect(upperBound(arr, 10)).toBe(3);
    expect(upperBound(arr, 3)).toBe(3);
  });
});
