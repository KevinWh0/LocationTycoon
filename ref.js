let canvas = document.querySelector("#glcanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gl = canvas.getContext("webgl2");
if (!gl) {
  alert("You dont have webgl2 support");
  // no webgl2 for you!
}

window.addEventListener("resize", () => {
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
});

//let vertices = [-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0];

let vertices = [
  // first triangle
  0.5,
  0.5,
  0.0, // top right
  0.5,
  -0.5,
  0.0, // bottom right
  -0.5,
  0.5,
  0.0, // top left
  // second triangle
  0.5,
  -0.5,
  0.0, // bottom right
  -0.5,
  -0.5,
  0.0, // bottom left
  -0.5,
  0.5,
  0.0, // top left
];

function init(gl) {
  //Set the clipspace (the area that is 0 to 1)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
export async function readTextFile(url) {
  const response = await fetch(url);
  return response.text();
}

function createShader(gl, type, source) {
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

function createProgram(gl, vertexShader, fragmentShader) {
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

init(gl);

let shaderProgram;
let vao;
var looper;

(async () => {
  let vbo = gl.createBuffer(); //int
  vao = gl.createVertexArray();

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, (vertices / 3) * 4, 0);
  gl.enableVertexAttribArray(0);

  let vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    await readTextFile("./shaders/vertex/rectangle.glsl")
  );

  let fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    await readTextFile("./shaders/fragment/rectangle.glsl")
  );

  shaderProgram = createProgram(gl, vertexShader, fragmentShader);
  looper = gl.getUniformLocation(shaderProgram, "looper");
  loop();
})();

let frames = 0;
let lastCheck = 0;

function loop() {
  gl.useProgram(shaderProgram);
  gl.bindVertexArray(vao);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);

  gl.uniform1f(looper, frames);

  if (lastCheck + 1000 < Date.now()) {
    lastCheck = Date.now();
    console.log(frames);
    frames = 0;
  }

  frames++;
  requestAnimationFrame(loop);
}
