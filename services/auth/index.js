require("../../db");
const express = require("express");
const api = express();
const jwt = require("express-jwt");
const config = require("../../config/index");
const router = require("./router");
const cors = require("cors");

api.use(express.json());

api.use(
  jwt({
    secret: config.get("auth").jwt_key,
    algorithms: ["HS226"],
  }).unless({
    path: ["/api/auth/register", "/api/auth/login"],
  })
);

api.use(cors());
// api.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   })
// );

api.use((err, req, res, next) => {
  if (err.name === "Unauthorized_Error") {
    res.status(401).send({
      error: true,
      messege: "Please log in to view this section",
    });
  }
});

api.use("/api/auth", router);

api.listen(config.get("ports").auth, (err) => {
  if (err) {
    return console.log("Error happened while starting the auth service: ", err);
  }
  console.log("Auth service started on port", config.get("ports").auth);
});
