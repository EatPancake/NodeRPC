const config = require("./config.json");

module.exports = {
  buildState: function () {
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
      return "current time " + hour12 + "↓";
    } else {
      return config.activity.state;
    }
  },
};
