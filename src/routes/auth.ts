import express from "express";
let bodyParser = require("body-parser");
let uuid = require("uuid");
const bcrypt = require("bcrypt");
const mailer = require("nodemailer");
let appLocal = require("../app.local");

// const Client = require('../app.local');

let router = express.Router();

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended: true}));

const jwt = require("jsonwebtoken");

router.get("/connect", (req, res) => {
  return res.status(200).json({
    success: true
  });
});

router.get("/getUsers", (req, res) => {
  appLocal.db
    .collection("people")
    .find({})
    .toArray(function(err: any, users: any) {
      if (err) throw err;
      users.map(function(item: any) {
        delete item.password;
        return item;
      });
      const data = {
        status: 200,
        result: users
      };
      res.send(data);
    });
});

router.post("/login", async (req, res) => {
  let {email, password} = req.body;
  appLocal.db
    .collection("people")
    .find({email})
    .toArray(function(err: any, user: any) {
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, function(
          err: any,
          bcryptres: any
        ) {
          if (bcryptres) {
            res.send({
              status: "success",
              access_token: jwt.sign({email: email}, "bitnation", {
                expiresIn: "10d"
              })
            });
          } else {
            res.send({
              status: "error",
              message: "Password is incorrect"
            });
          }
        });
      } else {
        res.send({
          status: "error",
          message: "User is not present"
        });
      }
    });
});

router.post("/reset-password", async (req, res) => {
  const {email} = req.body;
  const saltRounds = 10;
  var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "prameet.c@gmail.com",
      pass: "ribhu2895"
    }
  });

  var mail = {
    from: "prameet.c@gmail.com",
    to: email,
    subject: "Bitnation Reset Password",
    text: "Reset your password using this link",
    html: "Reset your password using this link"
  };

  smtpTransport.sendMail(mail, function(error: any, response: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
      res.send({
        status: true,
        message: "Reset email sent successfully"
      });
    }
    smtpTransport.close();
  });

  // bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
  //   const myquery = { email };
  //   const newvalues = { $set: { password: hash } };
  //   appLocal.db.collection("people").updateOne(myquery, newvalues, function (err: any, res: any) {
  //     if (err) throw err;
  //     console.log("1 document updated");
  //   });
  // });
});

router.post("/signup", (req, res) => {
  let {email, name, password, bitnationId} = req.body;
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
  bcrypt.hash(password, saltRounds, function(err: any, hash: any) {
    const ecptPassword = hash;
    let myobj = {email, name, password: ecptPassword, bitnationId};
    appLocal.db
      .collection("people")
      .insertOne(myobj, function(err: any, res: any) {
        if (err) throw err;
        console.log("1 document inserted");
        return res.status(200).json({
          success: true,
          message: "User Created Successfully"
        });
      });
  });
  // var query = { name: "Prameet" };
  // db.collection("users").deleteOne(myobj, function (err: any, obj: any) {
  //   if (err) throw err;
  //   console.log("1 document deleted");
  // });
});

module.exports = router;
