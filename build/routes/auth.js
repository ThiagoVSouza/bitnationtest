"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let bodyParser = require("body-parser");
let uuid = require("uuid");
const bcrypt = require("bcrypt");
const mailer = require("nodemailer");
let appLocal = require("../app.local");
// const Client = require('../app.local');
let router = express_1.default.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
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
        .toArray(function (err, users) {
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
    appLocal.db
        .collection("people")
        .find({ email })
        .toArray(function (err, user) {
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, bcryptres) {
                if (bcryptres) {
                    res.send({
                        status: "success",
                        access_token: jwt.sign({ email: email }, "bitnation", {
                            expiresIn: "10d"
                        })
                    });
                }
                else {
                    res.send({
                        status: "error",
                        message: "Password is incorrect"
                    });
                }
            });
        }
        else {
            res.send({
                status: "error",
                message: "User is not present"
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
        appLocal.db
            .collection("people")
            .insertOne(myobj, function (err, res) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXZDLDBDQUEwQztBQUUxQyxJQUFJLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztBQUVwRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxQixPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbkMsUUFBUSxDQUFDLEVBQUU7U0FDUixVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3BCLElB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