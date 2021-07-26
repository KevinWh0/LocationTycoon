import { positionX } from "./LocationManager.js";
import { onScreenObjects } from "./ObjectManager.js";

export function renderMap() {
  renderObjects();
}

function generateMap() {
  for (let i = 0; i < unitsWide; i++) {
    i += positionX;
    addOnScreenObject(i, 0);
  }
}

export function renderObjects() {
  onScreenObjects.forEach((obj) => {
    obj.update();
    obj.render();
  });
}
