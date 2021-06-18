const Recipes = require("../models/recipe");

module.exports = {
  fresh: async (req, res) => {
    // assume try catch
    try {
      const recipes = await Recipes.find();
      const fresh = recipes.reverse();
      res.status(200).send({
        error: false,
        message: "All Recipes are fetched",
        fresh,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        messege: "Could not fetch Recipes",
      });
    }
  },
  popular: async (req, res) => {
    const recipes = await Recipes.find();
    const sorted = await recipes.sort((a, b) => {
      return b.likes - a.likes;
    });
    const popular = await sorted.slice(0, 6);
    res.status(200).send({
      error: false,
      message: "Most Popular Fetched",
      recipes: popular,
    });
  },
};
