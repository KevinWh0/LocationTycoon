import { unitsTall, unitsWide } from "../core/camera.js";
import { positionX } from "./LocationManager.js";
import { addOnScreenObject, onScreenObjects } from "./ObjectManager.js";
import { GameObject } from "../core/GameObject.js";
import { seededRandom } from "../core/Misc.js";
import { mousePressed } from "../core/InputManager.js";

export function renderMap() {
  renderObjects();
  if (mousePressed) generateMap();
}

function generateMap() {
  for (let i = -unitsWide / 2; i < unitsWide / 2; i += 2) {
    for (let j = -unitsTall / 2; j < unitsTall / 2; j += 2) {
      i += positionX;
      if (seededRandom((i + 0.001) * j) % 100 < 20)
        addOnScreenObject(new GameObject(i, j, 4, 4, "Rock"));
    }
  }
  console.log(onScreenObjects.length);
}

export function renderObjects() {
  onScreenObjects.forEach((obj) => {
    obj.update();
    obj.render();
  });
}
