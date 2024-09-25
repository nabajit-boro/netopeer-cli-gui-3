// router.js
const express = require("express");
const xml2js = require("xml2js");
const util = require("util");
const router = express.Router();

// Endpoint to insert XML data into MongoDB
const setRoutes = (db) => {
  const mycol = db.collection("configuration");

  router.post("/storeXmlInDb", async (req, res) => {
    try {
      const xml = req.body.xml;

      // Convert XML to JavaScript Object
      const json_data = await xml2js.parseStringPromise(xml);

      // Insert the JSON string into MongoDB (or use the object itself if preferred)
      await mycol.insertOne({ data: json_data });

      // Use util.inspect to log the entire structure including nested objects
      const jsonLog = util.inspect(json_data, { showHidden: false, depth: null });
 

      

      res.status(200).send({ jsonLog});
    } catch (error) {
      res.status(500).send({ message: "Error", error });
    }
  });

  // Endpoint to retrieve JSON data and convert back to XML
  router.get("/getDataFromDb", async (req, res) => {
    try {
      const cursor = mycol.find({}, { projection: { _id: 0 } });
      const results = [];

      await cursor.forEach((x) => {
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(x);
        results.push(xml);
      });

      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error", error });
    }
  });

  return router;
};

module.exports = { setRoutes };
