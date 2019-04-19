"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let bodyParser = require("body-parser");
let uuid = require("uuid");
const bcrypt = require('bcrypt');
const mailer = require("nodemailer");
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
    appLocal.db.collection("people").find({ email }).toArray(function (err, user) {
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, bcryptres) {
                if (bcryptres) {
                    res.send({
                        status: "success",
                        access_token: jwt.sign({ email: email }, 'bitnation', {
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
router.post("/reset-password", async (req, res) => {
    const { email } = req.body;
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
    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXZDLDBDQUEwQztBQUUxQyxJQUFJLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztBQUVwRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDaEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxQixPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUwsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbkMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFB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