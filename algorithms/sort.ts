/******************************************************************************
 * Copyright 2020 xb-76
 * Source: (https://github.com/xb-76/algorithms)
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a copy * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE. 
 ******************************************************************************/

import { swap } from '../general-tools/general';

/**
 * @name insertionSort
 * @param { number[] } a - Array to search.
 * @returns { number[] } The index of the value in the array, -1 if not found.
 * @description Sorts the array by iterating over every element starting from
 * index 1 of the array and moving the iterated element towards the beginning
 * as per to keep all elements previous to the current index as sorted.
 */
export function insertionSort (a: number[]): number[] {
  let i = 1;
  let x: number, j: number;

  while (i < a.length) {
    x = a[i];
    j = i-1;

    while (j >= 0 && a[j] > x) {
      a[j+1] = a[j];
      j -= 1;
    }

    a[j+1] = x;
    i += 1;
  }

  return a;
}

/**
 * @name quicksort
 * @param { number[] } a - Array to search.
 * @param { number } [lo=0] - Low index value of the current sorting partion.
 * @param { number } [hi=a.length-1] - High index value of the current
 * sorting partition.
 * @returns { number[] } The sorted array.
 * @description Sorts the array by using a divide and conquer method split by a
 * pivot index returned from the partition function.
 */
export function quicksort(a: number[], lo: number = 0, hi: number = a.length-1): number[] {
  let p: number, obj: object;

  if (lo < hi) {
    obj = lomutoPartition(a, lo, hi);
    a = obj['a']; p = obj['p'];
    a = this.quicksort(a, lo, p-1);
    a = this.quicksort(a, p+1, hi);
  }

  return a;
}

/**
 * @name lomutoPartition
 * @param { number[] } a - Array to partition.
 * @param { number } lo- Low index value of the partition.
 * @param { number } hi - High index value of the partition.
 * @returns { object } Object holding the array and the new partition index.
 * @description Sorts the array by using a pivot which is based on how many
 * swaps took place in the previous section's sort.
 */
function lomutoPartition(a: number[], lo: number, hi: number): object {
  let pivot = a[hi];
  let i = lo;

  for (let j = lo; j < hi; j += 1) {
    if (a[j] < pivot) {
      a = swap(a, i, j);
      i += 1;
    }
  }

  a = swap(a, i, hi);
  return {a: a, p: i};
}

/**
 * @name mergeSort
 * @param { number[] } a - Array to sort.
 * @returns { number[] } A sorted array.
 * @description A divide and conquer method to sort smaller chunks of the array
 * and merge them together, then repeat.
 */
export function mergeSort(a: number[]): number[] {
  let L: number[], R: number[], m: number;

  if (a.length > 1) {
    m = Math.floor(a.length / 2);
    L = a.slice(0, m);
    R = a.slice(m, a.length);

    this.mergeSort(L);
    this.mergeSort(R);

    let i = 0, j = 0, k = 0;

    while (i < L.length && j < R.length) {
      if (L[i] < R[j]) {
        a[k] = L[i];
        i += 1;
      }
      else {
        a[k] = R[j];
        j += 1;
      }

      k += 1;
    }

    while (i < L.length) {
      a[k] = L[i];
      k += 1; i += 1;
    }

    while (j < R.length) {
      a[k] = R[j];
      k += 1; j += 1;
    }
  }

  return a;
}