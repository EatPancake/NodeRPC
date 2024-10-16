const fs = require("fs");

module.exports = {
  buildState: function () {
    const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
    if (config.activity.start_time_stamp === "localTime") {
      let hour12 = "";
      if (config.activity.twelve_hour_time === true) {
        hour12 =
          "(" +
          new Date()
            .toLocaleTimeString("en-US", { hour12: true })
            .split(" ")[1] +
          ") ";
      }
      let state = "";
      if (config.activity.state_and_time) {
        state = config.activity.state + " | ";
      }
      return state + "current time " + hour12 + "↓";
    } else {
      return config.activity.state;
    }
  },
};
