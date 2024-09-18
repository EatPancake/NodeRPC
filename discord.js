const config = require("./config.json");
const timeStamp = require("./timeStamp");
const stateBuilder = require("./stateBuilder");

const ID = config.id;
const DiscordRPC = require("discord-rpc");
const RPC = new DiscordRPC.Client({ transport: "ipc" });

DiscordRPC.register(ID);

async function activity() {
  if (!RPC) return;

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
  });
}

RPC.on("ready", async () => {
  console.log("RPC Presence running");
  activity();

  setInterval(() => {
    activity();
    console.log(timeStamp.getStartTimeStamp("localTime"));
    console.log(
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    );
  }, 15000);
});

RPC.login({ clientId: ID });
