import { init } from "./camera.js";
import { prepareInputManager } from "./InputManager.js";
import { runScene } from "./SceneManager.js";

//Stop looping if something really bad happens
let looping = true,
  supported = true,
  fullyLoaded = false;
export const maxFPS = 60; //60;
//!BASIC STUFF TO DO WITH SETTING UP WEBGL
let canvas = document.querySelector("#glcanvas");
export let width, height;
(width = window.innerWidth), (height = window.innerHeight);

canvas.width = width;
canvas.height = height;
window.addEventListener("resize", () => {
  (width = window.innerWidth), (height = window.innerHeight);
  canvas.width = width;
  canvas.height = height;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  init();
});

//Check for webgl2 support
export let gl = canvas.getContext("webgl2");
if (!gl) {
  //alert("You dont have webgl2 support");
  supported = false;
  // no webgl2 for you ):
}

export function setFullyLoaded(f) {
  fullyLoaded = f;
  //This is for the camera
  init();
  //Run the bound init function for the main game
  boundInit();
}

//!END OF SETUP

export let boundGameLoop = () => {
  //console.log("Please set the game loop function with setGameLoop()");
  //looping = false;
  runScene();
};

//used for checking support for webgl2 in browsers
function detectBrowser() {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) != -1
  ) {
    return "Opera";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return "Firefox";
  } else if (
    navigator.userAgent.indexOf("MSIE") != -1 ||
    !!document.documentMode == true
  ) {
    return "IE"; //oh nooo
  } else {
    return "Unknown";
  }
}
export let DEFAULT_GAME_LOOP = 1;
//The thing holding the set interval
let looper;
export function setGameLoop(gameLoop) {
  if (gameLoop != DEFAULT_GAME_LOOP) boundGameLoop = gameLoop;
  //If all went well then run the main loop
  if (supported) {
    looping = true;
    looper = setInterval(loop, 1000 / maxFPS);
  } else {
    //Safari users will get a special error since they don't prorperly support it yet
    if (detectBrowser() == "Safari") {
      alert(
        "Hello Safari user, currently Safari does not support WEBGL2 without messing around in the experimental features tab, please use another browser if you cant figure out how to enable it."
      );
    } else {
      alert(
        "whoops, It seems your browser does not support WEBGL2, There is a chance that it is also disabled. Look up how to enable it if your not sure how. Most major browsers support it(assuming you are up to date)"
      );
    }
  }
}

export let boundInit = () => {
  looping = false;
};

export function setInitFunc(init) {
  boundInit = init;
}

export let fps = -1;

let modules = {
  enabled: [],
  fpsModule: {
    vars: {
      frameCounter: 0,
      lastCheck: 0,
    },
    func: () => {
      modules.fpsModule.vars.framesCounter++;
      if (modules.fpsModule.vars.lastCheck + 1000 < Date.now()) {
        modules.fpsModule.vars.lastCheck = Date.now();
        fps = modules.fpsModule.vars.framesCounter;
        modules.fpsModule.vars.framesCounter = 0;
      }
    },
  },
};
//Add the fps module so we can keep track of fps
modules.enabled.push(modules.fpsModule);

function loop() {
  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (fullyLoaded) boundGameLoop();
  modules.enabled.forEach((module) => {
    module.func();
  });
  if (!looping) clearInterval(looper);
  //requestAnimationFrame(loop);
  prepareInputManager();
}
