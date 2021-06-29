const express = require("express");
const router = express.Router();
const controller = require("../../controllers/users");

router
  .get("/", controller.fetchAllUsers)
  .get("/:id", controller.fetchOneUser)
  .post("/update/:id", controller.postUserUpdate);

module.exports = router;
