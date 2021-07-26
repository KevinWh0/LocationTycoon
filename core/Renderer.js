import { MDN } from "../libs/matricies.js";
import { projection, unitsTall, unitsWide } from "./camera.js";
import { activeCamera, gl } from "./core.js";
import {
  RECTLOC_CAMERA_PROJECTION,
  RECTLOC_COLOR,
  RECTLOC_TRANSFORM,
  RECTLOC_VIEW_MATRIX,
  RECT_SHADER,
  TEXTURED_QUAD_SHADER,
  TEXTUREQUADLOC_CAMERA_PROJECTION,
  TEXTUREQUADLOC_DARKNESS,
  TEXTUREQUADLOC_IMAGEID,
  TEXTUREQUADLOC_TRANSFORM,
  TEXTUREQUADLOC_VIEW_MATRIX,
} from "./ShaderLoader.js";
import { bindTexture, textures } from "./TextureLoader.js";

let vertices = [
  -0.5,
  -0.5, //bottom left
  -0.5,
  0.5, //top left
  0.5,
  -0.5, //bottom right
  0.5,
  0.5, //top right
];

let textureCoords = [
  0,
  1, // Bottom left
  0,
  0, // Top left
  1,
  1, // Bottom right
  1,
  0, // Top right
];

let vao;

let vertex_vbo = gl.createBuffer(); //int
let texure_vbo = gl.createBuffer(); //int

vao = gl.createVertexArray();

gl.bindVertexArray(vao);

//Position VBO
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);
gl.enableVertexAttribArray(0);

//Texture VBO
gl.bindBuffer(gl.ARRAY_BUFFER, texure_vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);

gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 8, 0);
gl.enableVertexAttribArray(1);

export class Quad {
  x = 0;
  y = 0;

  clampX = 0;
  clampY = 0;

  w = 1;
  h = 1;

  angle = 0;

  transform = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.translate(x, y);
  }

  refreshTransform() {
    let offsetX = 0,
      offsetY = 0;

    if (this.clampX == Quad.RIGHT) offsetX = unitsWide / 2 - this.w / 2;
    else if (this.clampX == Quad.LEFT) offsetX = -(unitsWide / 2 - this.w / 2);

    if (this.clampY == Quad.TOP) offsetY = unitsTall / 2 - this.w / 2;
    else if (this.clampY == Quad.BOTTOM) offsetY = -unitsTall / 2 + this.w / 2;

    this.transform = MDN.translateMatrix(
      (offsetX + this.x) / this.w,
      (offsetY + this.y) / this.h,
      0
    );
    this.transform = MDN.multiplyMatrices(
      MDN.rotateZMatrix(this.angle),
      this.transform
    );
    this.transform = MDN.multiplyMatrices(
      MDN.scaleMatrix(this.w, this.h, 1),
      this.transform
    );
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

  setAnchor(x, y) {
    this.clampX = x;
    this.clampY = y;

    this.refreshTransform();
  }

  rotate(angle) {
    this.angle += MDN.degrees_to_radians(angle);

    this.refreshTransform();
  }

  scale(w, h) {
    this.w *= w;
    this.h *= h;

    this.refreshTransform();
  }

  setScale(w, h) {
    this.w = w;
    this.h = h;
    this.refreshTransform();
  }
}

Quad.CENTER = 0;
Quad.RIGHT = 1;
Quad.LEFT = 2;
Quad.TOP = 3;
Quad.BOTTOM = 4;

export class Rectangle extends Quad {
  color;
  constructor(x, y, w, h, color = [0.4, 0.5, 0.85]) {
    super(x, y, w, h);
    this.color = color;
  }

  render() {
    gl.useProgram(RECT_SHADER);
    gl.bindVertexArray(vao);

    gl.uniformMatrix4fv(RECTLOC_TRANSFORM, false, this.transform);
    gl.uniformMatrix4fv(RECTLOC_VIEW_MATRIX, false, activeCamera.transform);

    gl.uniformMatrix4fv(RECTLOC_CAMERA_PROJECTION, false, projection);
    gl.uniform3f(RECTLOC_COLOR, this.color[0], this.color[1], this.color[2]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 2);
  }

  renderAt(x, y, w, h, color = [1, 1, 1], angle = 0) {
    let transform = MDN.translateMatrix(x / w, y / h, 0);
    transform = MDN.multiplyMatrices(MDN.scaleMatrix(w, h, 1), transform);
    transform = MDN.multiplyMatrices(MDN.rotateZMatrix(angle), transform);
    gl.useProgram(RECT_SHADER);
    gl.bindVertexArray(vao);

    gl.uniformMatrix4fv(RECTLOC_TRANSFORM, false, transform);
    gl.uniformMatrix4fv(RECTLOC_CAMERA_PROJECTION, false, projection);
    gl.uniform3f(RECTLOC_COLOR, color[0], color[1], color[2]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 2);
  }
}

export class TexturedQuad extends Quad {
  img;
  darkness = 0;

  constructor(x, y, w, h, img) {
    super(x, y, w, h);
    this.img = img;
  }

  setDarkness(darkness) {
    this.darkness = darkness;
  }

  render() {
    gl.useProgram(TEXTURED_QUAD_SHADER);
    gl.bindVertexArray(vao);

    gl.uniformMatrix4fv(TEXTUREQUADLOC_TRANSFORM, false, this.transform);
    gl.uniformMatrix4fv(
      TEXTUREQUADLOC_VIEW_MATRIX,
      false,
      activeCamera.transform
    );
    gl.uniformMatrix4fv(TEXTUREQUADLOC_CAMERA_PROJECTION, false, projection);

    bindTexture(0, textures.get(this.img));
    gl.uniform1i(TEXTUREQUADLOC_IMAGEID, false, 0);
    gl.uniform1f(TEXTUREQUADLOC_DARKNESS, this.darkness);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 2);
  }

  renderAt(x, y, w, h, img, darkness = 0, angle = 0) {
    let transform = MDN.translateMatrix(x / w, y / h, 0);
    transform = MDN.multiplyMatrices(MDN.scaleMatrix(w, h, 1), transform);
    transform = MDN.multiplyMatrices(MDN.rotateZMatrix(angle), transform);
    gl.useProgram(TEXTURED_QUAD_SHADER);
    gl.bindVertexArray(vao);

    gl.uniformMatrix4fv(TEXTUREQUADLOC_TRANSFORM, false, transform);
    gl.uniformMatrix4fv(TEXTUREQUADLOC_CAMERA_PROJECTION, false, projection);

    bindTexture(0, textures.get(img));
    gl.uniform1i(TEXTUREQUADLOC_IMAGEID, false, 0);
    gl.uniform1f(TEXTUREQUADLOC_DARKNESS, darkness);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 2);
  }
}
