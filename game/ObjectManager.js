import { removeItem } from "../core/Misc.js";

export let onScreenObjects = [];
export let objDespawnOffScreen = [];

export function addOnScreenObject(obj, despawnOffScreen) {
  onScreenObjects.push(obj);
  objDespawnOffScreen.push(despawnOffScreen);
}

export function removeOnScreenObject(index) {
  onScreenObjects = removeItem(onScreenObjects, index);
}
