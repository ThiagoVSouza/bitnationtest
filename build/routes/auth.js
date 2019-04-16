"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let bodyParser = require("body-parser");
let uuid = require("uuid");
const bcrypt = require('bcrypt');
let appLocal = require('../app.local');
// const Client = require('../app.local');
let router = express_1.default.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");
router.get("/connect", (req, res) => {
    return res.status(200).json({
        success: true,
    });
});
router.get("/getUsers", (req, res) => {
    appLocal.db.collection("people").find({}).toArray(function (err, users) {
        if (err)
            throw err;
        users.map(function (item) {
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
    let { email, password } = req.body;
    let opts = {};
    var query = { email };
    let data = {};
    appLocal.db.collection("people").find({ email }).toArray(function (err, user) {
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, bcryptres) {
                if (bcryptres) {
                    res.send({
                        status: "success",
                        access_token: jwt.sign({ email: email }, user[0].password, {
                            expiresIn: "10d"
                        }),
                    });
                }
                else {
                    res.send({
                        status: "error",
                        message: "Password is incorrect",
                    });
                }
            });
        }
        else {
            res.send({
                status: "error",
                message: "User is not present",
            });
        }
    });
});
router.post("/reset-password", (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        const myquery = { email };
        const newvalues = { $set: { password: hash } };
        appLocal.db.collection("people").updateOne(myquery, newvalues, function (err, res) {
            if (err)
                throw err;
            console.log("1 document updated");
        });
    });
});
router.post("/signup", (req, res) => {
    let { email, name, password, bitnationId } = req.body;
    let opts = {};
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
    bcrypt.hash(password, saltRounds, function (err, hash) {
        const ecptPassword = hash;
        let myobj = { email, name, password: ecptPassword, bitnationId };
        appLocal.db.collection("people").insertOne(myobj, function (err, res) {
            if (err)
                throw err;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFdkMsMENBQTBDO0FBRTFDLElBQUksTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXBELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUVwQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNoQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFTCxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNuQyxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBUSxFQUFF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