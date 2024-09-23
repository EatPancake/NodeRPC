const express = require("express");
const http = require("http");

const cfg = require("./config.json");

const app = express();
const hostname = "localhost";
const port = 3000;

const rpc = require("./discord.js");

/* app.get("/", (req, res) => {
  res.render("./veiws/index.html");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); */
