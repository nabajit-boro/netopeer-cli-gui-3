// models/db.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://nabajitboro796:yy4K2CTzPL6bF0s8@cluster0.i04el.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

let db;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db("netopeer2gui");
    console.log("Connected to MongoDB");
  }
  return db;
}

module.exports = { connectToDB, client };
