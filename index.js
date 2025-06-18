"use strict";

const prompt = require("prompt-sync")();
const cakeRecipes = require("./cake-recipes.json");

// Your functions here
const firstRecipe = cakeRecipes[0];
// console.log(firstRecipe);

// 1
const getUniqueAuthors = function (recipes) {
  if (!Array.isArray(recipes) || recipes.length === 0) {
    console.log("No valid recipes provided.");
    return [];
  }

  let authorsList = [];
  recipes.forEach((recipe) => {
    if (recipe && typeof recipe === "object" && recipe["Author"]) {
      authorsList.push(recipe["Author"]);
    }
  });

  const authorCounteringObject = authorsList.reduce(
    (accumulator, currentValue) => {
      return {
        ...accumulator,
        [currentValue]: (accumulator[currentValue] || 0) + 1,
      };
    },
    {}
  );

  const authorCounterList = Object.entries(authorCounteringObject);
  const authorUniqueListCounter = authorCounterList.filter(
    (list) => list[1] === 1
  );

  const authorUniqueList = authorUniqueListCounter.map((author) => author[0]);

  // console.log(authorUniqueList);
  return authorUniqueList;
};

console.log(getUniqueAuthors(cakeRecipes));

// 2 Create a function that logs the name of each recipe. As input, it takes in a list of recipes with the same format as cakeRecipes. Use object destructuring in this function. If there are no recipes found in the input, then log that there are no recipes found.
const getRecipeName = function (recipes) {
  if (!recipes || recipes.length === 0) {
    return console.log("there are no recipes found");
  }

  const names = [];
  recipes.forEach((recipe) => {
    if (recipe && typeof recipe === "object" && recipe.Name) {
      const { Name } = recipe;
      console.log(`\n${Name}`);
      names.push(Name);
    }
  });

  return names;
};

// console.log(getRecipeName(cakeRecipes).length)
// getRecipeName(cakeRecipes);

// 3
const getRecipesByAuthor = function (recipes, author) {
  if (!Array.isArray(recipes) || typeof author !== "string") return [];

  const filteredRecipe = recipes.filter(
    (recipe) => recipe.Author.toLowerCase() === author.toLowerCase()
  );
  return filteredRecipe;
};

// console.log(getRecipesByAuthor(cakeRecipes, "Mary Cadogan"));
// console.log(getRecipesByAuthor(cakeRecipes, "Mary Cadogan").length);
getRecipeName(getRecipesByAuthor(cakeRecipes, "Mary Cadogan")); // Mary has 5 recipes

// 4
const getRecipeaByIngredient = function (recipes, ingredient) {
  if (!Array.isArray(recipes) || typeof ingredient !== "string") return [];
  const recipesWithIngredient = recipes.filter(
    (recipe) =>
      Array.isArray(recipe["Ingredients"]) &&
      recipe["Ingredients"].some(
        (ing) => ing.toLowerCase() === ingredient.toLowerCase()
      )
  );
  return recipesWithIngredient;
};

getRecipeName(getRecipeaByIngredient(cakeRecipes, "140g CASTER sugar"));
// getRecipeName(getRecipeaByIngredient(cakeRecipes, "140g caster sugar"));
// console.log(getRecipeName(getRecipeaByIngredient(cakeRecipes, "140g caster sugar")));

// 5
const getRecipeByName = function (recipes, name) {
  if (!Array.isArray(recipes) || typeof name !== "string") return null;
  const lowerName = name.toLowerCase();
  const recipe = recipes.find(
    (recipe) =>
      recipe &&
      typeof recipe.Name === "string" &&
      recipe.Name.toLowerCase().includes(lowerName)
  );

  if (recipe === undefined) {
    console.log("\n sorry we didn't find any recipe with that name.");
    return null;
  } else {
    console.log(recipe);
  }

  return recipe ? [recipe] : null
};

getRecipeByName(cakeRecipes, "Snow-capped Fairy cakes");
// 6
const getIngredients = function (recipes) {
  if (!Array.isArray(recipes) || recipes.length === 0) return [];

  const ingredients = [];
  recipes.forEach((recipe) => {
    if (Array.isArray(recipe["Ingredients"])) {
      ingredients.push(recipe["Ingredients"]);
    }
  });

  const flattenedIngredients = ingredients.reduce((accumulator, currentValue) =>
    accumulator.concat(currentValue)
  );

  console.log(flattenedIngredients);
  return flattenedIngredients;
};

getIngredients(getRecipesByAuthor(cakeRecipes, "Mary Cadogan"));

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

let choice;
let ingredientsSaved = [];

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(getUniqueAuthors(cakeRecipes));
      break;
    case 2:
      const author = prompt("Enter the name of the author please: ");
      const recipesByAuthor = getRecipesByAuthor(cakeRecipes, author);
      getRecipeName(recipesByAuthor);
      break;
    case 3:
      const ingredientInput = prompt("Enter the ingredient please: ");
      const recipesByIngredient = getRecipeaByIngredient(
        cakeRecipes,
        ingredientInput
      );
      getRecipeName(recipesByIngredient);
      break;
    case 4:
      const nameInput = prompt(
        "Enter the name of the recipe you're looking for please: "
      );
      const recipe = getRecipeByName(cakeRecipes, nameInput);
      if (!recipe) break;
      const option = prompt("Do you want to save the ingredients?: Y or N: ");
      if (option.toUpperCase() === "Y")
        ingredientsSaved.push(...getIngredients(recipe));
      break;
    case 5:
      console.log(ingredientsSaved);
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
