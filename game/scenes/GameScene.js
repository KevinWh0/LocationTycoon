import { activeCamera } from "../../core/core.js";
import { Rectangle, TexturedQuad } from "../../core/Renderer.js";
import { Scene } from "../../core/Scene.js";
import { setOnLocationUpdate } from "../LocationManager.js";
import { renderMap } from "../MapRenderer.js";
let rect = new Rectangle(0, 0, 10, 10);
let i = new TexturedQuad(0, 0, 5, 5, "Rock");
let tick = 0;
export class GameScene extends Scene {
  init() {
    setOnLocationUpdate((x, y, dist, timePassed) => {
      document.getElementById(
        "posDebug"
      ).innerHTML = `X: ${x}, Y: ${y}...... dist/time: ${dec.toString(
        dist / timePassed
      )}`;
      //console.log(x, y);
    });
  }

  onUnload() {}

  runScene() {
    renderMap();
    rect.render();
    i.render();
    //activeCamera.translate(0.01, 0);
    activeCamera.translate(Math.sin(tick / 100) / 1000, 0);
    tick++;
  }
}
