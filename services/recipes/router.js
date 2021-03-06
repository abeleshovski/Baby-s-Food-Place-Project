const express = require("express");
const router = express.Router();
const controller = require("../../controllers/recipes");

router
  .post("/newRecipe", controller.post)
  .get("/fetch/", controller.fetchAll)
  .get("/fetch/:id", controller.fetchOne)
  .patch("/:id/like", controller.likeRecipe)
  .patch("/:id/dislike", controller.dislikeRecipe)
  .delete("/delete/:_id", controller.deleteRecipe);
module.exports = router;
