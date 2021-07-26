export let positionX = 0,
  positionY = 0;
const lat_InMiles = 69,
  longe_InMiles = 54.6;

const feet_in_miles = 5280;

let lastLocationUpdate = 0;

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
    if (new_positionY != positionY || new_positionX != positionX) {
      let timePassed = Date.now() - lastLocationUpdate;
      //let distX = Math.abs(positionX - new_positionX);
      //let distY = Math.abs(positionY - new_positionY);
      var a = positionX - new_positionX;
      var b = positionY - new_positionY;

      let dist = Math.sqrt(a * a + b * b);

      //console.log(dist, timePassed);

      lastLocationUpdate = Date.now();
      onUpdate(new_positionX, new_positionY, dist, timePassed);
    }
    positionX = new_positionX;
    positionY = new_positionY;
  });
  button.remove();
});
button.innerHTML = "Activate Location";
button.id = "location";
document.body.appendChild(button);
