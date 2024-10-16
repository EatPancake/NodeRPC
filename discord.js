const fs = require("fs");

//const config = require("./config.json");
const timeStamp = require("./timeStamp");
const stateBuilder = require("./stateBuilder");

let ID = "";
const DiscordRPC = require("discord-rpc");
let RPC = "";

module.exports = { rpcStart };

function getID() {
  try {
    const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
    ID = config.id;
  } catch (e) {
    setTimeout(getID(), 5000);
  }
}

async function activity() {
  if (!RPC) return;

  const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

  if (config.activity.start_time_stamp !== "") {
    RPC.setActivity({
      details: config.activity.details,
      state: stateBuilder.buildState(),
      largeImageKey: config.activity.large_image_key,
      largeImageText: config.activity.large_image_text,
      smallImageKey: config.activity.small_image_key,
      smallImageText: config.activity.small_image_text,
      startTimestamp: timeStamp.getStartTimeStamp(
        config.activity.start_time_stamp,
      ),
      buttons: config.activity.buttons,
    });
  } else {
    RPC.setActivity({
      details: config.activity.details,
      state: stateBuilder.buildState(),
      largeImageKey: config.activity.large_image_key,
      largeImageText: config.activity.large_image_text,
      smallImageKey: config.activity.small_image_key,
      smallImageText: config.activity.small_image_text,
      endTimestamp: timeStamp.getEndTimeStamp(config.activity.end_time_stamp),
      buttons: config.activity.buttons,
    });
  }
}

function rpcStart() {
  getID();
  RPC = new DiscordRPC.Client({ transport: "ipc" });
  RPC.login({ clientId: ID });
  DiscordRPC.register(ID);
  RPC.on("ready", async () => {
    console.log("RPC Presence running");
    activity();

    setInterval(() => {
      activity();
    }, 15000);
  });
}
