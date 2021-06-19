const Recipes = require("../models/recipe");
const User = require("../models/user");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = {
  post: async (req, res) => {
    try {
      let recipe = {
        ...req.body,
        userId: req.user.id,
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
      const recipe = await Recipes.find({ userId: req.params.id });

      res.status(200).send({
        error: false,
        message: `User #${user.id}'s recipes fetched`,
        recipe,
      });
    } catch (error) {
      res.status(404).send({
        error: true,
        messege: error,
      });
    }
  },
  likeRecipe: async (req, res) => {
    try {
      const likeCounter = await Recipes.findById(req.params.id);
      const recipe = await Recipes.findByIdAndUpdate(
        req.params.id,
        { likes: likeCounter.likes + 1 },
        { new: true }
      );
      res.status(201).send({
        error: false,
        message: `Recipe with id ${req.params.id} liked`,
        recipe,
      });
    } catch (err) {
      res.status(500).send({
        error: true,
        message: err,
      });
    }
  },
  postUserUpdate: async (req, res) => {
    try {
      if (
        !req.body.password ||
        req.body.password != req.body.confirmation_password
      ) {
        return res.status(400).send({
          error: true,
          message: "Bad request. Passwords do not match.",
        });
      }
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      });

      res.status(201).send({
        messege: "success",
        error: false,
        user,
      });
    } catch (error) {
      res.status(400).send({
        messege: error,
        error: true,
      });
    }
  },
  fetchAllUsers: async (req, res) => {
    // assume try catch
    const users = await User.find();

    res.status(200).send({
      error: false,
      message: "All users are fetched",
      users,
    });
  },
  fetchOneUser: async (req, res) => {
    // assume try catch
    const user = await User.findById(req.params.id);

    res.status(200).send({
      error: false,
      message: `User with id #${req.params.id} fetched`,
      user,
      //recipe
    });
  },
  dislikeRecipe: async (req, res) => {
    try {
      const likeCounter = await Recipes.findById(req.params.id);
      const recipe = await Recipes.findByIdAndUpdate(
        req.params.id,
        { likes: likeCounter.likes + -1 },
        { new: true }
      );
      res.status(201).send({
        error: false,
        message: `Recipe with id ${req.params.id} liked`,
        recipe,
      });
    } catch (err) {
      res.status(500).send({
        error: true,
        message: err,
      });
    }
  },
  postRecipeUpdate: async (req, res) => {
    try {
      const recipe = await Recipes.findOne(req.params.id);
      const updatedRecipe = await recipe.update(req.body, {
        new: true,
        runValidators: true,
        context: "query",
      });

      res.status(201).send({
        messege: "success",
        error: false,
        updatedRecipe,
      });
    } catch (error) {
      res.status(400).send({
        messege: error,
        error: true,
      });
    }
  },
  deleteRecipe: async (req, res) => {
    await Recipes.deleteOne({ _id: req.params._id });
    res.redirect("/");
  },
};
