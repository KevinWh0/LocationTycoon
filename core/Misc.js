import { mouseDown } from "./InputManager.js";

export function seededRandom(str) {
  str = str + "";
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
    (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
      (h = (h << 13) | (h >>> 19));

  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

export function inArea(X, Y, x, y, w, h) {
  //if (mouseDown) console.log(X, Y, x, y, w, h);

  if (X > x - 1 && Y > y - 1 && X < x + w && Y < y + h) {
    return true;
  } else {
    return false;
  }
}

export function intersects(x1, y1, w1, h1, x, y, w, h) {
  if (
    inArea(x1, y1, x, y, w, h) ||
    inArea(x1 + w1, y1, x, y, w, h) ||
    inArea(x1 + w1, y1 + h1, x, y, w, h) ||
    inArea(x1, y1 + h1, x, y, w, h)
  ) {
    return true;
  } else {
    return false;
  }
}

export function removeItem(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1, array.length));
}

export function interpolate(a0, a1, w) {
  /* // You may want clamping by inserting:
   * if (0.0 > w) return a0;
   * if (1.0 < w) return a1;
   */
  return (a1 - a0) * w + a0;
  /* // Use this cubic interpolation [[Smoothstep]] instead, for a smooth appearance:
   * return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0;
   *
   * // Use [[Smootherstep]] for an even smoother result with a second derivative equal to zero on boundaries:
   * return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w * w * w) + a0;
   */
}

let randomVecs = [
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 },
];

function randomVec(ix, iy) {
  // Random float. No precomputed gradients mean this works for any number of grid coordinates
  let random = seededRandom(ix + iy);
  return { x: Math.cos(random), y: Math.sin(random) };
}

function getDotProduct(a, b) {
  return a.x * b.x + a.y * b.y;
}

function perlin() {}
