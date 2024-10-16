let url = "http://localhost:3000";
let activityForm = document.getElementById("activityForm");

const config = await (await fetch(url)).json();

document.getElementById("id").value = config.id;
document.getElementById("details").value = config.activity.details;
document.getElementById("state").value = config.activity.state;
document.getElementById("large_image_key").value =
  config.activity.large_image_key;
document.getElementById("large_image_text").value =
  config.activity.large_image_text;
document.getElementById("small_image_key").value =
  config.activity.small_image_key;
document.getElementById("small_image_text").value =
  config.activity.small_image_text;
document.getElementById("time_stamp").value = isStartStamp(
  config.activity.start_time_stamp,
)
  ? config.activity.start_time_stamp
  : config.activity.end_time_stamp;
document.getElementById("twelve_hour_time").checked =
  config.activity.twelve_hour_time;
document.getElementById("state_and_time").checked =
  config.activity.state_and_time;
activityForm.addEventListener("submit", sendActivity);

function isStartStamp(timeStamp) {
  if (timeStamp === "elapsed") return true;
  if (timeStamp === "localTime") return true;
  return false;
}

function sendActivity() {
  let timeStamp = document.getElementById("time_stamp").value;
  let startStamp = isStartStamp(timeStamp);
  fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify({
      id: document.getElementById("id").value,
      activity: {
        details: document.getElementById("details").value,
        state: document.getElementById("state").value,
        large_image_key: document.getElementById("large_image_key").value,
        large_image_text: document.getElementById("large_image_text").value,
        small_image_key: document.getElementById("small_image_key").value,
        small_image_text: document.getElementById("small_image_text").value,
        start_time_stamp: startStamp
          ? document.getElementById("time_stamp").value
          : "",
        twelve_hour_time: document.getElementById("twelve_hour_time").checked,
        state_and_time: document.getElementById("state_and_time").checked,
        end_time_stamp: startStamp
          ? ""
          : document.getElementById("time_stamp").value,
      },
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
