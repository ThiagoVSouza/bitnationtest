"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let bodyParser = require("body-parser");
let uuid = require("uuid");
var router = express_1.default.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");
router.get("/connect", (req, res) => {
    const mongoClient = require("mongodb").MongoClient;
    const assert = require("assert");
    // Connection URL
    const dbName = "bitnation";
    // Use connect method to connect to the server
    new mongoClient("mongodb://8e02a03c-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true", {
        auth: {
            user: "8e02a03c-0ee0-4-231-b9ee",
            password: "hqdvE6k7s3uOMDaYGq0Ce1RETKzGhfKl60Dqj4Lp2cB8JphoPpiJWOgYaIwJcZEfHbJqmbDAJWUsY0gDrdkLug=="
        }
    }).connect((err, client) => {
        if (err)
            return console.error(err);
        console.log("Database connected");
        const db = client.db(dbName);
        // db.createCollection("people", function(err: any, res: any) {
        //   if (err) throw err;
        //   console.log("Collection created!");
        // });
        // let myobj = { id: uuid.v4(), name: "Prameet", company: "bitnation" };
        var query = { name: "Prameet" };
        db.collection("people").find(query).toArray(function (err, result) {
            if (err)
                throw err;
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
    let { email, password } = req.body;
    let opts = {};
    if (email === "abc@def.com") {
        if (password === "password") {
            opts.expiresIn = 120; //token expires in 2min
            const secret = "SECRET_KEY"; //normally stored in process.env.secret
            const token = jwt.sign({ email }, secret, opts);
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
    let { email, name, password } = req.body;
    let opts = {};
    return res.status(200).json({
        success: true,
        message: "User Created Successfully"
    });
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCLElBQUksTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXBELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUVwQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNsQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ25ELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVqQyxpQkFBaUI7SUFDakIsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBRTNCLDhDQUE4QztJQUU5QyxJQUFJLFdBQVcsQ0FDYix3RUFBd0UsRUFDeEU7UUFDRSxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsMEJBQTBCO1lBQ2hDLFFBQVEsRUFDTiwwRkFBMEY7U0FDN0Y7S0FDRixDQUNGLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLE1BQVcsRUFBRSxFQUFFO1FBQ2xDLElBQUksR0FBRztZQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxP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