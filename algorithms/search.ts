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

/**
 * @name binarySearch
 * @param { number[] } a - Array to search.
 * @param { number } v - Value to find in the array.
 * @param { number } [l=0] - Left index bound of a to search.
 * @param { number } [r=a.length-1] - Right index bound of a to search.
 * @returns { number } The index of the value in the array, -1 if not found.
 * @description *REQUIRES A SORTED ARRAY. Finds the value by continually
 * splitting the array 'a' in two and choosing the chunk based on the chunk's
 * border values.
 */
export function binarySearch(a: number[], v: number, l: number = 0, r: number = a.length-1): number {
  let m: number;

  while (l <= r) {
    m = Math.floor((l + r) / 2);

    if (a[m] < v)
      l = m+1;
    else if (a[m] > v)
      r = m-1;
    else
      return m;
  }
  return -1;
}

/**
 * @name binarySearchAlt
 * @param { number[] } a - Array to search.
 * @param { number } v - Value to find in the array.
 * @param { number } [l=0] - Left index bound of a to search.
 * @param { number } [r=a.length-1] - Right index bound of a to search.
 * @returns { number } The index of the value in the array, -1 if not found.
 * @description *REQUIRES A SORTED ARRAY. Finds the value by continually
 * splitting the array in two and choosing the chunk based on the chunk's
 * border values.
 */
export function binarySearchAlt(a: number[], v: number, l: number = 0, r: number = a.length-1): number {
  let m: number;

  while (l != r) {
    m = Math.ceil((l + r) / 2);

    if (a[m] > v)
      r = m-1;
    else
      l = m;
  }

  if (a[l] === v)
    return l;

  return -1;
}

/**
 * @name interpolationSearch
 * @param { number[] } a - Array to search.
 * @param { number } v - Value to find in the array.
 * @param { number } [l=0] - Left index bound of a to search.
 * @param { number } [r=a.length-1] - Right index bound of a to search.
 * @returns { number } The index of the value in the array, -1 if not found.
 * @description *REQUIRES A SORTED ARRAY. Uses the binary search method of
 * splitting the array 'a' into two chunks, but instead of splitting on the
 * mid-point, the break-point is chosen by where the value is expected to be if
 * the difference between all values were equivalent.
 */
export function interpolationSearch(a: number[], v: number, l: number = 0, r: number = a.length-1): number {
  let pos: number;

  while (l <= r && v >= a[l] && v <= a[r]) {
    if (l === r) {
      if (a[l] === v)
        return l;
      return -1;
    }

    pos = l + (((r - l) / (a[r] - a[l])) * (v - a[l]));

    if (a[pos] === v)
      return pos;
    else if (a[pos] < v)
      l = pos+1;
    else
      r = pos-1;
  }

  return -1;
}

/**
 * @name fibonacciSearch
 * @param { number[] } a - Array to search.
 * @param { number } v - Value to find in the array.
 * @returns { number } The index of the value in the array, -1 if not found.
 * @description *REQUIRES A SORTED ARRAY. Finds the smallest fibonacci number
 * that is greater than the array 'a' length, then uses the previous two
 * fibonacci numbers as chunks and checks which one the values resides in. Then
 * recursively does the same process using the one of the previous fibonacci
 * numbers as the new zero.
 */
export function fibonacciSearch(a: number[], v: number): number {
  let n = a.length;
  let fibNsub2 = 0;
  let fibNsub1 = 1;
  let fibN = fibNsub2 + fibNsub1;
  let offset: number, i: number;

  while (fibN < n) {
    fibNsub2 = fibNsub1;
    fibNsub1 = fibN;
    fibN = fibNsub2 + fibNsub1;
  }

  offset = -1;

  while (fibN > 1) {
    i = Math.min(offset + fibNsub2, n-1);

    if (a[i] < v) {
      fibN = fibNsub1;
      fibNsub1 = fibNsub2;
      fibNsub2 = fibN - fibNsub1;
      offset = i;
    }
    else if (a[i] > v) {
      fibN = fibNsub2;
      fibNsub1 = fibNsub1 - fibNsub2;
      fibNsub2 = fibN - fibNsub1;
    }
    else return i;
  }

  if (fibNsub1 && a[offset+1] === v)
    return offset+1;
}

/**
 * @name jumpSearch
 * @param { number[] } a - Array to search.
 * @param { number } v - Value to find in the array.
 * @param { number } [baseStep=Math.floor(Math.sqrt(a.length)))] - Base step
 * to increase by
 * @returns { number } The index of the value in the array, -1 if not found.
 * @description *REQUIRES A SORTED ARRAY. Finds the value by iterating with a
 * step equal to the squareroot of the length of the array ('baseStep'). The
 * iterator increases by a factor of the 'baseStep' if the value is greater than
 * the current index value.
 */
export function jumpSearch(a: number[], v: number, baseStep: number = Math.floor(Math.sqrt(a.length))): number {
  let n = a.length;
  let step = baseStep
  let prev = 0;

  while (a[Math.min(step, n)-1] < v) {
    prev = step;
    step += baseStep;

    if (prev >= n)
      return -1;
  }

  while (a[prev] < v) {
    prev += 1;

    if (prev === Math.min(step, n))
      return -1;
  }

  if (a[prev] === v)
    return prev;

  return -1;
}

/**
 * @name exponentialSearch
 * @param { number[] } a - Array to search.
 * @param { number } v - Value to find in the array.
 * @returns { number } The index of the value in the array, -1 if not found.
 * @description *REQUIRES A SORTED ARRAY. Finds the value by iterating with a
 * step equal to the 1 and continually multiplying the value by 2 on each
 * iteration until the index value is greater than or equal to 'v'. It then uses
 * binary search on the last chunk.
 */
export function exponentialSearch(a: number[], v: number): number {
  if (a[0] === v)
    return 0;

  let i = 1;
  let n = a.length;

  while (i < n && a[i] <= v)
    i *= 2;

  return binarySearch(a.slice(i/2, Math.min(i, n)), v) + i/2;
}

/**
 * @name linearSearch
 * @param { number[] } a - Array to search.
 * @param { number } v - Value to find in the array.
 * @returns { number } The index of the value in the array, -1 if not found.
 * @description Finds the value by iterating over every index starting at 0 and
 * moving towards the end of the array.
 */
export function linearSearch(a: number[], v: number): number {
  for (let i = 0; i < a.length; i+=1)
    if (a[i] === v)
      return i;
  return -1;
}

/**
 * @name linearSearchRev
 * @param { number[] } a - Array to search.
 * @param { number } v - Value to find in the array.
 * @returns { number } The index of the value in the array, -1 if not found.
 * @description Finds the value by iterating over every index starting at the
 * end of the array and moving towards 0.
 */
export function linearSearchRev(a: number[], v: number): number {
  for (let i = a.length-1; i >= 0; i-=1)
    if (a[i] === v)
      return i;
  return -1;
}