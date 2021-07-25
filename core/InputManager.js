export let keyPressed = -1;
export let lastPressedKey = -1;
export let keys = new Array(255);
export let keyDown = false;
export let keyReleased = false;

export let mousePressed = false;
export let mouseDown = false;
export let mouseX, mouseY;

export function prepareInputManager() {
  mousePressed = false;
}
window.addEventListener("mousedown", function (e) {
  mousePressed = true;
  mouseDown = true;
});
window.addEventListener("mouseup", function (e) {
  mouseDown = false;
});
window.addEventListener("mousemove", function (e) {
  mouseX = e.x;
  mouseY = e.y;
});
window.addEventListener("keydown", function (e) {
  keys[getCode(e.key)] = true;
  keyPressed = getCode(e.key);
  keyDown = true;

  //console.log(event.keyCode);
});
window.addEventListener("keyup", function (e) {
  keys[getCode(e.key)] = false;
  keyDown = false;
  keyReleased = true;
});

export function getCode(char) {
  return char.charCodeAt(0);
}
