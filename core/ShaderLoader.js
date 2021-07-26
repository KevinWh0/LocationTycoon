import { gl, setFullyLoaded } from "./core.js";

export let RECT_SHADER;

export let TEXTURED_QUAD_SHADER;

export let RECTLOC_CAMERA_PROJECTION;

export let RECTLOC_VIEW_MATRIX;

export let RECTLOC_TRANSFORM;

export let RECTLOC_COLOR;

export let TEXTUREQUADLOC_CAMERA_PROJECTION;

export let TEXTUREQUADLOC_TRANSFORM;

export let TEXTUREQUADLOC_IMAGEID;

export let TEXTUREQUADLOC_DARKNESS;

export let TEXTUREQUADLOC_VIEW_MATRIX;

let inited = false;
initShaders();
export async function initShaders() {
  if (inited) return;
  //LOAD SHADERS HERE
  RECT_SHADER = await loadShader("rectangle");
  TEXTURED_QUAD_SHADER = await loadShader("textureQuad");
  initUniforms();
  inited = true;
  setFullyLoaded(true);
}

function initUniforms() {
  RECTLOC_CAMERA_PROJECTION = gl.getUniformLocation(
    RECT_SHADER,
    "camProjectionMatrix"
  );

  RECTLOC_TRANSFORM = gl.getUniformLocation(
    RECT_SHADER,
    "transformationMatrix"
  );

  RECTLOC_VIEW_MATRIX = gl.getUniformLocation(RECT_SHADER, "viewMatrix");

  RECTLOC_COLOR = gl.getUniformLocation(RECT_SHADER, "color");

  TEXTUREQUADLOC_IMAGEID = gl.getUniformLocation(
    TEXTURED_QUAD_SHADER,
    "imageId"
  );

  TEXTUREQUADLOC_CAMERA_PROJECTION = gl.getUniformLocation(
    TEXTURED_QUAD_SHADER,
    "camProjectionMatrix"
  );

  TEXTUREQUADLOC_TRANSFORM = gl.getUniformLocation(
    TEXTURED_QUAD_SHADER,
    "transformationMatrix"
  );

  TEXTUREQUADLOC_DARKNESS = gl.getUniformLocation(
    TEXTURED_QUAD_SHADER,
    "darkness"
  );

  TEXTUREQUADLOC_VIEW_MATRIX = gl.getUniformLocation(
    TEXTURED_QUAD_SHADER,
    "viewMatrix"
  );
}

export async function loadShader(name) {
  let vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    await readTextFile(`../shaders/vertex/${name}.glsl`)
  );

  let fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    await readTextFile(`../shaders/fragment/${name}.glsl`)
  );

  var shaderProgram = createProgram(gl, vertexShader, fragmentShader);
  return shaderProgram;
}

//!--------------------------------HELPER FUNCTIONS--------------------------------
export async function readTextFile(url) {
  const response = await fetch(url);
  return response.text();
}

export function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

export function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program); // COMPILE!!!!

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
