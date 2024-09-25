// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB } = require("./models/db");
const { setRoutes } = require("./routers/router"); // Import the router function

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to the DB once and pass the db instance to the routes
connectToDB().then((db) => {
  app.use('/', setRoutes(db));  // Pass the connected db to the routes
  
}).catch((err) => {
  console.error("Failed to connect to the database", err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});