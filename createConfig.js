const fs = require("fs");
const rpc = require("./discord.js");
const defaultConfig = {
  id: "1284349652195348482",
  activity: {
    details: "Node RPC by: Pancake",
    state: "Idle",
    large_image_key: "https://i.imgur.com/dOeIe6i.png",
    large_image_text: "PanPan by: Pancake",
    small_image_key: "https://i.imgur.com/BqsiWlo.png",
    small_image_text: "node icon",
    start_time_stamp: "elapsed",
    twelve_hour_time: true,
    state_and_time: true,
    end_time_stamp: "",
  },
};
if (!fs.existsSync("config.json")) {
  fs.writeFile("config.json", JSON.stringify(defaultConfig), (err) => {
    if (err) console.log(err);
    else {
      console.log("created config");
      rpc.rpcStart();
    }
  });
} else {
  console.log("config already exists");
  rpc.rpcStart();
}
