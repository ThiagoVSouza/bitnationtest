import express from "express";
let bodyParser = require("body-parser");
let uuid = require("uuid");
const bcrypt = require('bcrypt');

let appLocal = require('../app.local');

let router = express.Router();

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }));

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {

  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, 'bitnation', (err: any, decoded: any) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        appLocal.db.collection("nations").find({}).toArray(function (err: any, nation: any) {
          if (err) throw err;
          const data = {
            status: 200,
            result: nation
          }
          res.send(data);
        });
      }
    })
  } else {
    return res.send({
      success: false,
      message: 'Auth Token was not provided'
    });
  }
  
});

router.post("/delete", (req, res) => {
  const { nationId } = req.body;
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, 'bitnation', (err: any, decoded: any) => {
      var myquery = { _id: nationId };
      if (err) {
        return res.send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        appLocal.db.collection("nations").deleteOne(myquery, function (err: any, obj: any) {
          if (err) throw err;
          console.log("1 document deleted");
          res.send({
            status: true,
            message: "Nation Deleted Successfully",
          })
        });
    }
  })
  } else {
    return res.send({
      success: false,
      message: 'Auth Token was not provided'
    });
  }
});

router.post("/create", async (req, res) => {
  let { plan, chat_protocol, chat_server, api_address, nation_short_name, nation_full_name } = req.body;
  const token = req.headers['authorization']; 
 
  if (token) {
    console.log(token);
    jwt.verify(token, 'bitnation', (err: any, decoded: any) => {
      console.log(err, decoded, 'errrr');
      if (err) {
        return res.send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        // req.decoded = decoded;
        console.log(decoded, 'decoded');
        let myobj = { plan, chat_protocol, chat_server, api_address, nation_short_name, nation_full_name };
        appLocal.db.collection("nations").insertOne(myobj, function (err: any, res: any) {
          if (err) throw err;
          console.log("1 document inserted");
          return res.send({
            success: true,
            message: "Nation Created Successfully"
          });
        });
      }
    });
  } else {
    return res.send({
      success: false,
      message: 'Auth Token was not provided'
    });
  }
});

module.exports = router;
