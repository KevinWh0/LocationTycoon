import {
  DEFAULT_GAME_LOOP,
  fps,
  gl,
  setGameLoop,
  setInitFunc,
  width,
} from "./core/core.js";
import { getCode, keys, mouseDown, mousePressed } from "./core/InputManager.js";
import { Quad, Rectangle, TexturedQuad } from "./core/Renderer.js";
import { addScene, changeScene } from "./core/SceneManager.js";
import { loadTexture, textures } from "./core/TextureLoader.js";
import { GameScene } from "./game/scenes/GameScene.js";
let rect = new Rectangle(0, 0, 10, 10);

setInitFunc(async () => {
  rect.setAnchor(Quad.RIGHT, Quad.CENTER);
  addScene(new GameScene());
  changeScene(0);
  setGameLoop(DEFAULT_GAME_LOOP);
});

let tick = 0;
function loop() {
  if (keys[getCode("l")]) rect.render();

  for (let i = 0; i < 60; i++) {
    //rect.renderAt(i, 0, 1, 1, [perlin(i, 1), 1, 0]);
  }

  tick++;
}
