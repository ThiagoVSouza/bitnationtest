"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = 80;
const mongoClient = require("mongodb").MongoClient;
const dbName = "bitnation";
let db, Client;
app_1.default.listen(port);
new mongoClient("mongodb://8e02a03c-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true", {
    auth: {
        user: "8e02a03c-0ee0-4-231-b9ee",
        password: "hqdvE6k7s3uOMDaYGq0Ce1RETKzGhfKl60Dqj4Lp2cB8JphoPpiJWOgYaIwJcZEfHbJqmbDAJWUsY0gDrdkLug=="
    },
    useNewUrlParser: true
}).connect((err, client) => {
    if (err)
        return console.error(err);
    console.log("Database connected");
    db = client.db(dbName);
    exports.db = db;
    exports.client = client;
});
console.log(`Hello World, listening to port ${port}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC5sb2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7QUFDaEIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztBQUVuRCxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUM7QUFFM0IsSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDO0FBRWYsYUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVqQixJQUFJLFdBQVcsQ0FDYix3RUFBd0UsRUFDeEU7SUFDRSxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsMEJBQTBCO1FBQ2hDLFFBQVEsRUFDTiwwRkFBMEY7S0FDN0Y7SUFDRCxlQUFlLEVBQUUsSUFBSTtDQUN0QixDQUNGLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLE1BQVcsRUFBRSxFQUFFO0lBQ2xDLElBQUksR0FBRztRQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbEMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkIsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDaEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxJQUFJLEVBQUUsQ0FBQyxDQUFDIn0=