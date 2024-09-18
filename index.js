const express = require("express");
const http = require("http");

const cfg = require("./config.json");

const app = express();
const hostname = "localhost";
const port = 3000;

const rpc = require("./discord.js");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });

  res.end("Hello World\n");
});

app.get("/", (req, res) => {
  res.render("./veiws/index.html");
});

server.listen(port, hostname, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
