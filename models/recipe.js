const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: ["Must Have Title"],
  },
  category: {
    type: String,
    required: ["Must have selected a Category"],
  },
  prepTime: {
    type: Number,
    required: ["Must have a Prep Time"],
  },
  numberOfPeople: {
    type: Number,
    required: ["Must have a number of people"],
  },
  description: {
    type: String,
    required: ["Must have a description"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: String,
  },
  imageName: {
    type: String,
  },
  usersThatLiked: {
    type: String,
  },
});

module.exports = mongoose.model("Recipes", recipeSchema, "recipes");
