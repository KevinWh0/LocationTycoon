import { onScreenObjects } from "./ObjectManager.js";

export function renderMap() {
  renderObjects();
}

export function renderObjects() {
  onScreenObjects.forEach((obj) => {
    obj.update();
    obj.render();
  });
}
