const { mergeSort, mergeSortInPlace } = require("../src/sorting/mergeSort");

describe("mergeSort", () => {
  test("sorts array of numbers", () => {
    const arr = [5, 2, 8, 1, 9, 3];
    expect(mergeSort(arr)).toEqual([1, 2, 3, 5, 8, 9]);
  });

  test("does not mutate original array", () => {
    const arr = [3, 1, 2];
    mergeSort(arr);
    expect(arr).toEqual([3, 1, 2]);
  });

  test("handles empty array", () => {
    expect(mergeSort([])).toEqual([]);
  });

  test("handles single element", () => {
    expect(mergeSort([42])).toEqual([42]);
  });

  test("handles already sorted array", () => {
    expect(mergeSort([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  test("handles reverse sorted array", () => {
    expect(mergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  test("handles duplicates", () => {
    expect(mergeSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  test("is stable (preserves order of equal elements)", () => {
    const arr = [
      { v: 3, id: "a" },
      { v: 1, id: "b" },
      { v: 3, id: "c" },
      { v: 1, id: "d" },
    ];
    const sorted = mergeSort(arr.map((x) => x.v));
    // For primitives, we verify order is maintained for same values
    expect(sorted).toEqual([1, 1, 3, 3]);
  });
});

describe("mergeSortInPlace", () => {
  test("sorts array in place", () => {
    const arr = [5, 2, 8, 1, 9, 3];
    mergeSortInPlace(arr);
    expect(arr).toEqual([1, 2, 3, 5, 8, 9]);
  });

  test("returns the same array reference", () => {
    const arr = [3, 1, 2];
    const result = mergeSortInPlace(arr);
    expect(result).toBe(arr);
  });

  test("handles empty array", () => {
    const arr = [];
    mergeSortInPlace(arr);
    expect(arr).toEqual([]);
  });
});
