const express = require("express");
const router = express.Router();
const controller = require("../../controllers/auth");
router
  .post("/register", controller.register)
  .post("/login", controller.login)
  .get("/:id", controller.fetchOne)
  .get("/refresh-token", controller.refresh_token);
// .get('/loggedIn', controller.loggedIn);

module.exports = router;
