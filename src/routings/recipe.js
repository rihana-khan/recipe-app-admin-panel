const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const recipeController = require("../controllers/recipes");

router.get("/", recipeController.getRecipes);
router.delete("/remove_recipe", checkAuth, recipeController.removeRecipe);

module.exports = router;