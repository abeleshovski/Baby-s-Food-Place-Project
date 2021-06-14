const express = require("express");
const router = express.Router();
const controller = require("../../controllers/recipes");

router
  .post("/newRecipe", controller.post)
  .get("/", controller.fetchAll)
  .get("/:id", controller.fetchOne);
module.exports = router;
