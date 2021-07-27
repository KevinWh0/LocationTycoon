import { activeCamera } from "../../core/core.js";
import { Rectangle, TexturedQuad } from "../../core/Renderer.js";
import { Scene } from "../../core/Scene.js";
import { setOnLocationUpdate } from "../LocationManager.js";
import { renderMap } from "../MapRenderer.js";
let rect = new Rectangle(0, 0, 10, 10, [1, 0, 0]);
let i = new TexturedQuad(0, 0, 5, 5, "Rock");
let tick = 0;
export class GameScene extends Scene {
  init() {
    setOnLocationUpdate((x, y, dist, timePassed) => {
      document.getElementById(
        "posDebug"
      ).innerHTML = `X: ${x}, Y: ${y}...... dist/time: ${dist / timePassed}`;
      activeCamera.setPos(x, y);
      //activeCamera.setPos(10, 0);

      //console.log(x, y);
    });
  }

  onUnload() {}

  runScene() {
    renderMap();
    //rect.render();
    //i.render();
    //activeCamera.setPos(0, 1);

    //activeCamera.translate(0.01, 0);
    //activeCamera.translate(0.1, 0);
    //activeCamera.translate(Math.sin(tick / 100) / 10, 0);
    tick++;
  }
}
