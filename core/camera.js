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

export class Camera {
  x = 0;
  y = 0;
  w = 1;
  h = 1;
  angle = 0;

  transform = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.refreshTransform();
  }

  refreshTransform() {
    this.transform = MDN.translateMatrix(-this.x / this.w, -this.y / this.h, 0);
    this.transform = MDN.multiplyMatrices(
      MDN.rotateZMatrix(this.angle),
      this.transform
    );
    //this.transform = MDN.multiplyMatrices(
    //  MDN.scaleMatrix(this.w, this.h, 1),
    //  this.transform
    //);
  }
  translate(dx, dy) {
    this.x += dx;
    this.y += dy;

    this.refreshTransform();
  }
  setPos(dx, dy) {
    this.x = dx;
    this.y = dy;
    this.refreshTransform();
  }
  rotate(angle) {
    this.angle += MDN.degrees_to_radians(angle);

    this.refreshTransform();
  }
}
