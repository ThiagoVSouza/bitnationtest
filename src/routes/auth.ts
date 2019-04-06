import express from "express";
let bodyParser = require("body-parser");
let uuid = require("uuid");

var router = express.Router();

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended: true}));

const jwt = require("jsonwebtoken");

router.get("/connect", (req, res) => {
  const mongoClient = require("mongodb").MongoClient;
  const assert = require("assert");

  // Connection URL
  const dbName = "bitnation";

  // Use connect method to connect to the server

  new mongoClient(
    "mongodb://8e02a03c-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true",
    {
      auth: {
        user: "8e02a03c-0ee0-4-231-b9ee",
        password:
          "hqdvE6k7s3uOMDaYGq0Ce1RETKzGhfKl60Dqj4Lp2cB8JphoPpiJWOgYaIwJcZEfHbJqmbDAJWUsY0gDrdkLug=="
      }
    }
  ).connect((err: any, client: any) => {
    if (err) return console.error(err);
    console.log("Database connected");
    const db = client.db(dbName);
    // db.createCollection("people", function(err: any, res: any) {
    //   if (err) throw err;
    //   console.log("Collection created!");
    // });
    // let myobj = { id: uuid.v4(), name: "Prameet", company: "bitnation" };
    var query = { name: "Prameet" };
    db.collection("people").find(query).toArray(function (err: any, result: any) {
      if (err) throw err;
      console.log(result);
    });
    // db.collection("people").insertOne(myobj, function(err: any, res: any) {
    //   if (err) throw err;
    //   console.log("1 document inserted");
    // });
    // db.collection("users").deleteOne(myobj, function (err: any, obj: any) {
    //   if (err) throw err;
    //   console.log("1 document deleted");
    // });
    client.close();
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  let {email, password} = req.body;
  let opts: any = {};
  if (email === "abc@def.com") {
    if (password === "password") {
      opts.expiresIn = 120; //token expires in 2min
      const secret = "SECRET_KEY"; //normally stored in process.env.secret
      const token = jwt.sign({email}, secret, opts);
      return res.status(200).json({
        success: true,
        access_token: token
      });
    }
  }
  return res.status(401).json({
    success: false,
    message: "Auth Failed"
  });
});

router.post("/signup", (req, res) => {
  let {email, name, password} = req.body;
  let opts: any = {};
  return res.status(200).json({
    success: true,
    message: "User Created Successfully"
  });
});

module.exports = router;
