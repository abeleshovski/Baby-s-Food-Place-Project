require("../../db");
const express = require("express");
const api = express();
const jwt = require("express-jwt");
const config = require("../../config/index");
const router = require("./router");
const cors = require("cors");

api.use(cors());

api.use(express.json());

api.use(
  jwt({
    secret: config.get("auth").jwt_key,
    algorithms: ["HS256"],
  })
);

api.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({
      error: true,
      message: "You need to log in in order to perform this action",
    });
  }
});

api.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

api.use("/api/recipes", router);

const PORT = process.env.PORT || config.get("ports").recipes;

api.listen(PORT, (err) => {
  if (err) {
    return console.log(
      "Error happened while starting the storage service: ",
      err
    );
  }
  console.log("Recipe service successfully started on port", PORT);
});
