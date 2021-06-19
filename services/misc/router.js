const express = require("express");
const router = express.Router();
const controller = require("../../controllers/frontPage.js");

router
  .get("/fresh/", controller.fresh)
  .get("/popular/", controller.popular)
  .get("/:filename", controller.images);
module.exports = router;
