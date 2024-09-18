const config = require("./config.json");
const start = Date.now();

module.exports = {
  getStartTimeStamp: function (type) {
    if (type === "localTime") {
      return getLocalTimeToElapsedTime();
    } else if (type === "elapsed") {
      return Date.now();
    } else {
      null;
    }
  },
  getEndTimeStamp: function (type) {
    if (type === "x") {
      return 0;
    } else {
      return null;
    }
  },
};
function getLocalTimeToElapsedTime() {
  let localtime = new Date()
    .toLocaleTimeString("en-US", {
      hour12: config.activity.twelve_hour_time,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
    //.split(":")[0]
    .replace(/ (AM|PM)$/, "");
  if (parseInt(localtime.split(":"[0]), 10) === 24) {
    localtime = localtime.replace("24", "00");
  }
  return Date.now() - convertToMilliseconds(localtime);
}

function convertToMilliseconds(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
}
