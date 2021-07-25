export let positionX, positionY;
const lat_InMiles = 69,
  longe_InMiles = 54.6;

const feet_in_miles = 5280;

let onUpdate = () => {};

export function setOnLocationUpdate(onUpdate_) {
  onUpdate = onUpdate_;
}

let button = document.createElement("button");
button.addEventListener("click", () => {
  const locationGrabber = navigator.geolocation.watchPosition((position) => {
    let new_positionX = position.coords.latitude * lat_InMiles * feet_in_miles;
    let new_positionY =
      position.coords.longitude * longe_InMiles * feet_in_miles;
    document.getElementById(
      "posDebug"
    ).innerHTML = `X: ${new_positionX}, Y: ${new_positionY}`;
    if (new_positionY != positionY || new_positionX != positionX) {
      onUpdate(new_positionX, new_positionY);
    }
    positionX = new_positionX;
    positionY = new_positionY;
  });
  button.remove();
});
button.innerHTML = "Activate Location";
button.id = "location";
document.body.appendChild(button);
