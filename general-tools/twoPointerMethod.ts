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
 * @name twoPointerOut
 * @param { string } s - String to find character in.
 * @param { string } c - Character to find.
 * @param { number } [l=Math.floor((s.length-1)/2)] - Left pointer.
 * @param { number } [r=Math.ceil((s.length-1)/2)] - Right pointer.
 * @returns { number } The index of closest character to the starting pointers
 * with left priority over right.
 */
export function twoPointerOut(s: string, c: string, l: number = Math.floor((s.length-1) / 2), r: number = Math.ceil((s.length-1) / 2)): number {
  while (l >= 0 && r < s.length) {
    if (s[l] === c)
      return l;

    if (s[r] === c)
      return r;

    l -= 1; r += 1;
  }

  while (l >= 0) {
    if (s[l] === c)
      return l;
    l -= 1;
  } 

  while (r < s.length) {
    if (s[r] === c)
      return r;
    r += 1;
  }

  return -1;
}

/**
 * @name twoPointerIn
 * @param { string } s - String to find character in.
 * @param { string } c - Character to find.
 * @param { number } [l=0] - Left pointer.
 * @param { number } [r=s.length-1] - Right pointer.
 * @returns { number } The index of closest character to the starting pointers
 * with left priority over right.
 */
export function twoPointerIn(s: string, c: string, l: number = 0, r: number = s.length-1): number {
  let m = Math.floor(s.length / 2);

  while (l <= m && r > m) {
    if (s[l] === c)
      return l;

    if (s[r] === c)
      return r;

    l += 1; r -= 1;
  }

  if (l != m)
    if (s[l+1] === c)
      return l+1;

  return -1;
}