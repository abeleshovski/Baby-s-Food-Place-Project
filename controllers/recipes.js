const Recipes = require("../models/recipe");
const User = require("../models/user");

module.exports = {
  post: async (req, res) => {
    try {
      let recipe = {
        ...req.body,
        userId: req.user.id,
        userFullName: req.user.fullName,
      };
      await Recipes.create(recipe);
      res.status(200).send({
        error: false,
        recipe,
      });
    } catch (err) {
      res.status(500).send({
        error: true,
        message: err.message,
      });
    }
  },
  fetchAll: async (req, res) => {
    // assume try catch
    try {
      const recipes = await Recipes.find();
      res.status(200).send({
        error: false,
        message: "All Recipes are fetched",
        recipes,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        messege: "Could not fetch Recipes",
      });
    }
  },
  fetchOne: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const recipe = await Recipes.find();

      res.status(200).send({
        error: false,
        message: `User #${user.id}'s recipes fetched`,
        recipe,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        messege: error,
      });
    }
  },
};
