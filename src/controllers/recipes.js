const Recipe = require('../models/recipe');

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      recipes,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.removeRecipe = async (req, res) => {
  try {
    const recipeId = req.body.recipe_id;

    if (!recipeId) {
      return res.status(400).json({
        message: "Recipe id needed",
      });
    }

    await Recipe.deleteOne({ _id: recipeId });
    let recipes = await Recipe.find({});

    res.status(200).json({
      message: "Successfully deleted",
      recipes,
    });
  } catch (err) {
    res.status(500);
  }
};