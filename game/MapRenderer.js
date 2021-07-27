import { unitsTall, unitsWide } from "../core/camera.js";
import { positionX } from "./LocationManager.js";
import {
  addOnScreenObject,
  onScreenObjects,
  removeOnScreenObject,
} from "./ObjectManager.js";
import { GameObject } from "../core/GameObject.js";
import { inArea, intersects, removeItem, seededRandom } from "../core/Misc.js";
import { mousePressed } from "../core/InputManager.js";
import { activeCamera } from "../core/core.js";
import { Rectangle } from "../core/Renderer.js";

export function renderMap() {
  renderObjects();
  if (mousePressed) generateMap();
}

const tileSize = 2;

function generateMap() {
  for (let i = -unitsWide / 4; i < unitsWide / 4; i += 1) {
    for (
      let j = -Math.round(unitsTall / 4);
      j < Math.round(unitsTall / 4);
      j += 1
    ) {
      //i += positionX;
      /*if (
        seededRandom(
          (Math.round(activeCamera.x) + i) * (Math.round(activeCamera.y) + j)
        ) %
          100 <
        20
      ) {*/
      addOnScreenObject(
        new GameObject(
          Math.round(activeCamera.x / 2) + i,
          Math.round(activeCamera.y / 2) + j,
          tileSize,
          tileSize,
          "Rock"
        ),
        true
      );
      //console.log(i);
    }
    //}
  }
  //console.log(onScreenObjects.length);
}
let e = new Rectangle(0, 0, 10, 10);
export function renderObjects() {
  let toRemove = [];
  let camXInTiles = activeCamera.x / 2 - unitsWide / 2,
    camYInTiles = activeCamera.y / 2 + unitsTall / 2;
  e.setPos(camXInTiles, camYInTiles);
  e.setScale(unitsWide, unitsTall);
  e.render();
  for (let i = 0; i < onScreenObjects.length; i++) {
    const obj = onScreenObjects[i];
    obj.update();
    obj.render();
    let objX = obj.x,
      objY = obj.y;

    if (!inArea(objX, objY, camXInTiles, -camYInTiles, unitsWide, unitsTall)) {
      //e.renderAt(objX + 1, objY, 5, 5);
      //removeItem(onScreenObjects, obj)
      toRemove.push(i);
    }
  }

  for (let i = 0; i < toRemove.length; i++) {
    removeOnScreenObject(toRemove[i]);
  }
}
