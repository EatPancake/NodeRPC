const express = require("express");
const http = require("http");
const fs = require("fs");

const cfg = require("./createConfig.js");

const expr = express();
const port = 3000;

const { app, BrowserWindow, ipcMain } = require("electron");
let appPath = app.getAppPath();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 850,
    hight: 600,
  });

  win.loadFile(__dirname + "/views/index.html");
};
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
expr.use(express.json());
expr.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
  res.send(data);
});
expr.post("/", (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  fs.writeFile("./config.json", data, (err) => {
    if (err) res.send({ updated: false, message: err });
    else res.send({ updated: true, message: "activity updated" });
  });
});
expr.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
