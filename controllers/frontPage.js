const Recipes = require("../models/recipe");
const fs = require("fs");
const path = require("path");

module.exports = {
  fresh: async (req, res) => {
    // assume try catch
    try {
      const recipes = await Recipes.find();
      const reversed = recipes.reverse();
      const fresh = await reversed.slice(0, 3);
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
      popular,
    });
  },
  images: (req, res) => {
    const storageDirectory = path.join(__dirname, "..", "uploads", "recipes");

    if (!fs.existsSync(`${storageDirectory}/${req.params.filename}`)) {
      return res.status(404).send({
        error: true,
        message: "File not found!",
      });
    }

    res.download(`${storageDirectory}/${req.params.filename}`);
  },
  fetchOne: async (req, res) => {
    // assume try catch
    try {
      const recipe = await Recipes.findById(req.params.id);

      res.status(200).send({
        error: false,
        message: `Recipe with id #${req.params.id} fetched`,
        recipe,
      });
    } catch (err) {
      res.status(404).send({
        error: true,
        message: err,
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
  getAvatar: (req, res) => {
    const storageDirectory = path.join(__dirname, "..", "uploads", "avatar");

    if (!fs.existsSync(`${storageDirectory}/${req.params.filename}`)) {
      return res.status(404).send({
        error: true,
        message: "File not found!",
      });
    }

    res.download(`${storageDirectory}/${req.params.filename}`);
  },
};
