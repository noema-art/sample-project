/**
 * Merge Sort - stable O(n log n) sorting algorithm.
 *
 * Returns a new sorted array (does not mutate input).
 */

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr.slice();
  }

  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  while (i < left.length) {
    result.push(left[i++]);
  }

  while (j < right.length) {
    result.push(right[j++]);
  }

  return result;
}

/**
 * In-place merge sort variant (mutates original array).
 */
function mergeSortInPlace(arr) {
  if (arr.length <= 1) return arr;

  const aux = new Array(arr.length);
  mergeSortHelper(arr, aux, 0, arr.length - 1);
  return arr;
}

function mergeSortHelper(arr, aux, lo, hi) {
  if (lo >= hi) return;

  const mid = lo + ((hi - lo) >> 1);
  mergeSortHelper(arr, aux, lo, mid);
  mergeSortHelper(arr, aux, mid + 1, hi);
  mergeInPlace(arr, aux, lo, mid, hi);
}

function mergeInPlace(arr, aux, lo, mid, hi) {
  for (let k = lo; k <= hi; k++) {
    aux[k] = arr[k];
  }

  let i = lo;
  let j = mid + 1;

  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      arr[k] = aux[j++];
    } else if (j > hi) {
      arr[k] = aux[i++];
    } else if (aux[i] <= aux[j]) {
      arr[k] = aux[i++];
    } else {
      arr[k] = aux[j++];
    }
  }
}

module.exports = { mergeSort, mergeSortInPlace };
