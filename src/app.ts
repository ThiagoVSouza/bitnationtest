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

export = app;
