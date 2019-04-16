import express from "express";
let bodyParser = require("body-parser");
let uuid = require("uuid");
const bcrypt = require('bcrypt');

let appLocal = require('../app.local');

// const Client = require('../app.local');

let router = express.Router();

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended: true}));

const jwt = require("jsonwebtoken");

router.get("/connect", (req, res) => {
    return res.status(200).json({
      success: true,
    });
  });

router.post("/login", (req, res) => {
  let {email, password} = req.body;
  let opts: any = {};
  var query = { email: email };
  appLocal.db.collection("people").find(query).toArray(function (err: any, result: any) {
    if (err) throw err;
    console.log(result);
    bcrypt.compare(password, result[0].password, function (err: any, bcryptres: any) {
      if (bcryptres) {
        return res.json({
          success: false,
          access_token: jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: email
          }, result[0].password),
        });
      }
    });
  });

  return res.status(401).json({
    success: false,
    message: "Auth Failed"
  });
});

router.post("/signup", (req, res) => {
  let { email, name, password, bitnationId } = req.body;
  let opts: any = {};
    // db.createCollection("people", function(err: any, res: any) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  // });
  const saltRounds = 10;
  // appLocal.db.collection('people', function (err: any, collection: any) {
  //   collection.remove({}, function (err: any, removed: any) {
  //     if (removed) {
  //       console.log('collection removed');
  //     } else {
  //       console.log('error emoving collection');
  //     }
  //   });
  // });
  // bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
  //   const ecptPassword = hash;
  //   let myobj = { email, name, password: ecptPassword, bitnationId };
  //   appLocal.db.collection("people").insertOne(myobj, function (err: any, res: any) {
  //     if (err) throw err;
  //     console.log("1 document inserted");
  //     return res.status(200).json({
  //       success: true,
  //       message: "User Created Successfully"
  //     });
  //   });
  // });
  // var query = { name: "Prameet" };
  // appLocal.db.collection("people").find({}).toArray(function (err: any, result: any) {
  //   if (err) throw err;
  //   console.log(result);
  // });
  // db.collection("users").deleteOne(myobj, function (err: any, obj: any) {
  //   if (err) throw err;
  //   console.log("1 document deleted");
  // });

    
  });


module.exports = router;
