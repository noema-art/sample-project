/**
 * Binary Search algorithms for sorted arrays.
 *
 * All functions assume the input array is sorted in ascending order.
 */

/**
 * Standard binary search.
 * Returns index of target if found, otherwise -1.
 */
function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return -1;
}

/**
 * Lower bound: returns the index of the first element >= target.
 * If all elements are smaller than target, returns arr.length.
 */
function lowerBound(arr, target) {
  let lo = 0;
  let hi = arr.length;

  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo;
}

/**
 * Upper bound: returns the index of the first element > target.
 * If all elements are <= target, returns arr.length.
 */
function upperBound(arr, target) {
  let lo = 0;
  let hi = arr.length;

  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] <= target) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo;
}

module.exports = { binarySearch, lowerBound, upperBound };
