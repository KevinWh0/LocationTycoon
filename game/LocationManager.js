export let positionX = 0,
  positionY = 0;
const lat_InMiles = 69,
  longe_InMiles = 54.6;

let lastLocationUpdate = 0;

const carSpeed = 10; //Anything above 10 MPH is bad, probably a car

let onUpdate = () => {};

export function setOnLocationUpdate(onUpdate_) {
  onUpdate = onUpdate_;
}

let button = document.createElement("button");
button.addEventListener("click", () => {
  const locationGrabber = navigator.geolocation.watchPosition((position) => {
    let new_positionX = position.coords.latitude * lat_InMiles;
    let new_positionY = position.coords.longitude * longe_InMiles;
    if (new_positionY != positionY || new_positionX != positionX) {
      let timePassed = Date.now() - lastLocationUpdate;
      //let distX = Math.abs(positionX - new_positionX);
      //let distY = Math.abs(positionY - new_positionY);
      var a = positionX - new_positionX;
      var b = positionY - new_positionY;

      let dist = Math.sqrt(a * a + b * b);
      let timeInHoursPassed =
        timePassed * 1000 /*seconds*/ * 60 /*Minutes*/ * 60; /*Hours*/
      if (dist / timeInHoursPassed > carSpeed) {
        alert("CAR SPEED REACHED, PLEASE DONT PLAY IN A CAR");
      }
      console.log(dist / timeInHoursPassed);

      lastLocationUpdate = Date.now();
      onUpdate(new_positionX, new_positionY, dist, timeInHoursPassed);
    }
    positionX = new_positionX;
    positionY = new_positionY;
  });
  button.remove();
});
button.innerHTML = "Activate Location";
button.id = "location";
document.body.appendChild(button);
