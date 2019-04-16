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
router.post("/login", (req, res) => {
    let { email, password } = req.body;
    let opts = {};
    var query = { email: email };
    appLocal.db.collection("people").find(query).toArray(function (err, result) {
        if (err)
            throw err;
        console.log(result);
        bcrypt.compare(password, result[0].password, function (err, bcryptres) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFdkMsMENBQTBDO0FBRTFDLElBQUksTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXBELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUVwQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNoQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFTCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNqQyxJQUFJLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDakMsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFDO0lBQ25CLElBQUksS0FBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzdCLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFRLEVBQUUsTUFBVztRQUNsRixJQUFJLEdBQUc7WUFBRSxNQUFNLEdBQUcsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxHQUFRLEVBQUUsU0FBYztZQUM3RSxJQUFJLFNBQVMsRUFBRTtnQkFDYixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2QsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7d0JBQzlDLElBQUksRUFBRSxLQUFLO3FCQUNaLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxQixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxhQUFhO0tBQ3ZCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbEMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDdEQsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFDO0lBQ2pCLCtEQUErRDtJQUNqRSx3QkFBd0I7SUFDeEIsd0NBQXdDO0lBQ3hDLE1BQU07SUFDTixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdEIsMEVBQTBFO0lBQzFFLDhEQUE4RDtJQUM5RCxxQkFBcUI7SUFDckIsMkNBQTJDO0lBQzNDLGVBQWU7SUFDZixpREFBaUQ7SUFDakQsUUFBUTtJQUNSLFFBQVE7SUFDUixNQUFNO0lBQ04scUVBQXFFO0lBQ3JFLCtCQUErQjtJQUMvQixzRUFBc0U7SUFDdEUsc0ZBQXNGO0lBQ3RGLDBCQUEwQjtJQUMxQiwwQ0FBMEM7SUFDMUMsb0NBQW9DO0lBQ3BDLHVCQUF1QjtJQUN2Qiw2Q0FBNkM7SUFDN0MsVUFBVTtJQUNWLFFBQVE7SUFDUixNQUFNO0lBQ04sbUNBQW1DO0lBQ25DLHVGQUF1RjtJQUN2Rix3QkFBd0I7SUFDeEIseUJBQXlCO0lBQ3pCLE1BQU07SUFDTiwwRUFBMEU7SUFDMUUsd0JBQXdCO0lBQ3hCLHVDQUF1QztJQUN2QyxNQUFNO0FBR04sQ0FBQyxDQUFDLENBQUM7QUFHTCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyJ9