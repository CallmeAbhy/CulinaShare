import React, { useState } from "react";
import axios from "axios";

const Contribute = () => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    Recipe: "",
    veg: false,
    youtubelink: "",
    imagelink: "",
    ingredients: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: checked,
    });
  };

  const handleIngredientChange = (e, index) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index] = e.target.value;

    setRecipeData({
      ...recipeData,
      ingredients: newIngredients,
    });
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    return (
      recipeData.name.trim() !== "" &&
      recipeData.Recipe.trim() !== "" &&
      recipeData.youtubelink.trim() !== "" &&
      recipeData.imagelink.trim() !== "" &&
      recipeData.ingredients.every((ingredient) => ingredient.trim() !== "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isFormValid()) {
        // Display error message for incomplete form
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Error: Please fill in all fields";
        errorMessage.style.color = "red";
        e.target.parentNode.appendChild(errorMessage);
        return;
      }

      // Check if the recipe name already exists in the API
      const existingRecipe = await axios.get(
        "https://restobackend-1.onrender.com/api/recipes"
      );
      if (
        existingRecipe.data.some((recipe) => recipe.name === recipeData.name)
      ) {
        // Display error message for duplicate data
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Error: Duplicate data";
        errorMessage.style.color = "red";
        e.target.parentNode.appendChild(errorMessage);
        return;
      }

      const response = await axios.post(
        "https://restobackend-1.onrender.com/api/recipes",
        recipeData
      );
      console.log(response.data.message);

      // Display success message
      const successMessage = document.createElement("p");
      successMessage.textContent = "Successful data posting done";
      successMessage.style.color = "green";
      e.target.parentNode.appendChild(successMessage);

      // Reset the form
      setRecipeData({
        name: "",
        Recipe: "",
        veg: false,
        youtubelink: "",
        imagelink: "",
        ingredients: [],
      });
    } catch (error) {
      console.error("Error contributing recipe:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Contribute Your Recipe
      </h2>
      {/* Contribute Form Section */}
      <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Recipe Name:
            </label>
            <input
              type="text"
              name="name"
              value={recipeData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Recipe:
            </label>
            <textarea
              name="Recipe"
              value={recipeData.Recipe}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="flex items-center text-gray-700 text-sm font-bold">
              <input
                type="checkbox"
                name="veg"
                checked={recipeData.veg}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Vegetarian
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              YouTube Link:
            </label>
            <input
              type="text"
              name="youtubelink"
              value={recipeData.youtubelink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image Link:
            </label>
            <input
              type="text"
              name="imagelink"
              value={recipeData.imagelink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ingredients:
            </label>
            {recipeData.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                className="w-full p-2 border rounded mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setRecipeData({
                  ...recipeData,
                  ingredients: [...recipeData.ingredients, ""],
                })
              }
              className="text-blue-500"
            >
              Add Ingredient
            </button>
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              !isFormValid() && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid()}
          >
            Contribute
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contribute;
