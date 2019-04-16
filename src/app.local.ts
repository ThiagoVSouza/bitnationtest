import app from "./app";
const port = 8080;
const mongoClient = require("mongodb").MongoClient;

const dbName = "bitnation";

let db, Client;

app.listen(port);

new mongoClient(
  "mongodb://8e02a03c-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true",
  {
    auth: {
      user: "8e02a03c-0ee0-4-231-b9ee",
      password:
        "hqdvE6k7s3uOMDaYGq0Ce1RETKzGhfKl60Dqj4Lp2cB8JphoPpiJWOgYaIwJcZEfHbJqmbDAJWUsY0gDrdkLug=="
    },
    useNewUrlParser: true
  }
).connect((err: any, client: any) => {
  if (err) return console.error(err);
  console.log("Database connected");
  db = client.db(dbName);
  exports.db = db;
  exports.client = client;
});

console.log(`Hello World, listening to port ${port}`);


