const express = require("express");
const router = express.Router();
const controller = require("../../controllers/storage");

router
  .post("/new", controller.uploadRecipe)
  .delete("/delete/:filename", controller.delete)
  .post("/postAvatar", controller.uploadAvatar);

module.exports = router;
