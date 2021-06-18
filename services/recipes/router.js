const express = require("express");
const router = express.Router();
const controller = require("../../controllers/recipes");

router
  .post("/newRecipe", controller.post)
  .get("/fetch/", controller.fetchAll)
  .get("/fetch/:id", controller.fetchOne)
  .get("/users", controller.fetchAllUsers)
  .get("/users/:id", controller.fetchOneUser)
  .post("/update/:id", controller.postUpdate)
  .patch("/:id/like", controller.likeRecipe);
module.exports = router;
