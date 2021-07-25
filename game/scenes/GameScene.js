import { Scene } from "../../core/Scene.js";
import { setOnLocationUpdate } from "../LocationManager.js";
import { renderMap } from "../MapRenderer.js";

export class GameScene extends Scene {
  init() {
    setOnLocationUpdate((x, y) => {
      console.log(x, y);
    });
  }

  onUnload() {}

  runScene() {
    renderMap();
  }
}
