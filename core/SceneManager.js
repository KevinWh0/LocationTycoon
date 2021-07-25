export let currentScene = 0;
let scenes = [];
let timer = 0;

export function addScene(scene) {
  scenes.push(scene);
}

export function runScene() {
  timer++;
  scenes[currentScene].runScene(timer);
}

export function changeScene(scene) {
  scenes[currentScene].onUnload();
  currentScene = scene;
}
