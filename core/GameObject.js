import { TexturedQuad } from "./Renderer.js";

export class GameObject extends TexturedQuad {
  constructor(x, y, w, h, img) {
    super(x, y, w, h, img);
  }
  update() {}
}
