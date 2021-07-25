import { MDN } from "../libs/matricies.js";
import { height, width } from "./core.js";

export let projection = [];
export let unitsWide, unitsTall;
//let unitsWide = 60;

//export function setZoom(zoom) {
//unitsWide = zoom;
//init();
//}

export function init() {
  unitsWide = 60;
  unitsTall = height / (width / unitsWide);

  projection = MDN.orthographicMatrix(
    -unitsWide / 2,
    unitsWide / 2,
    -unitsTall / 2,
    unitsTall / 2,
    -1,
    1
  );
}
