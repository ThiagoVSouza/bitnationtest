import express from "express";
let auth = require("./routes/auth");
let nation = require("./routes/nation");

let app = express();

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, usersessionid");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use("/auth", auth);
app.use("/nation", nation);
app.use("/", function(req, res) {
  res.statusCode = 200;

  res.setHeader("Content-Type", "text/html");

  res.end("<h1>Hello World</h1>");
});

export = app;
