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
        console.log(err, user, 'klkl');
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