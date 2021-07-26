import { gl } from "./core.js";

export let textures = new Map();

let currentlyBoundTextures = { 0: -1 };

initTextures();
export function initTextures() {
  loadTexture("Rock");
}

export async function loadTexture(fileName, callback) {
  // Create a texture and put the image in it.
  createAndSetupTexture(gl, fileName, (texture) => {
    textures.set(fileName, texture);

    if (callback != undefined) callback(texture);
  });
}

//!--------------------------------HELPER FUNCTIONS--------------------------------

export function bindTexture(textureSlot, textureId) {
  //if (currentlyBoundTextures[textureSlot] == textureId) return;
  if (textureSlot == 0) {
    gl.activeTexture(gl.TEXTURE0);
  } else if (textureSlot == 1) {
    gl.activeTexture(gl.TEXTURE1);
  } else if (textureSlot == 2) {
    gl.activeTexture(gl.TEXTURE2);
  }
  currentlyBoundTextures[textureSlot] = textureId;

  gl.bindTexture(gl.TEXTURE_2D, textureId);
}

async function createAndSetupTexture(gl, imgName, callback) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  await loadImageFile(`../assets/images/${imgName}.png`, (image) => {
    //console.log(image.width, image.height);

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      image.width,
      image.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      image
    );
    gl.generateMipmap(gl.TEXTURE_2D);
    if (callback != undefined) callback(texture);
    //return texture;
  });
}

export async function loadImageFile(href, callback) {
  let img = new Image();
  img.src = href;
  img.onload = () => {
    callback(img);
  };
  //img.addEventListener("load", () => {});
}
