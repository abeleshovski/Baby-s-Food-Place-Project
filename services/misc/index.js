require("../../db");
const express = require("express");
const api = express();
const config = require("../../config/index");
const router = require("./router");
const cors = require("cors");

api.use(express.json());

api.use(cors());

api.use("/api/misc", router);

api.listen(config.get("ports").misc, (err) => {
  if (err) {
    return console.log("Error happened while starting the misc service: ", err);
  }
  console.log("Misc service started on port", config.get("ports").misc);
});
