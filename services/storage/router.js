const express = require("express");
const router = express.Router();
const controller = require("../../controllers/storage");

router
  .post("/new", controller.upload)
  .delete("/delete/:filename", controller.delete);

module.exports = router;
