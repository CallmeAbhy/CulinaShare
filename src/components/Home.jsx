import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace the URL with your actual API endpoint
    axios
      .get("https://restobackend-1.onrender.com/api/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));

    // Fetch favorites data from the backend
    axios
      .get("https://restobackend-1.onrender.com/api/favorites")
      .then((response) => setFavorites(response.data))
      .catch((error) => console.error("Error fetching favorites:", error));
  }, []);

  const isRecipeInFavorites = (recipeName) => {
    return favorites.some((favorite) => favorite.name === recipeName);
  };

  const handleAddToFavorites = async (recipeName) => {
    try {
      const response = await axios.post(
        "https://restobackend-1.onrender.com/api/favorites",
        {
          ...recipes.find((recipe) => recipe.name === recipeName),
        }
      );
      console.log(response.data.message);
      setFavorites([...favorites, response.data.favorite]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (recipeName) => {
    navigate(`/recipe/${encodeURIComponent(recipeName)}`);
  };

  return (
    <div className="container mx-auto mt-16 px-4">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for a dish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.name}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={recipe.imagelink}
              alt={recipe.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
              <p className="text-gray-700 mb-2">
                {recipe.veg ? "Vegetarian" : "Non-Vegetarian"}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleViewDetails(recipe.name)}
                  className="text-blue-500 cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleAddToFavorites(recipe.name)}
                  className={`${
                    isRecipeInFavorites(recipe.name)
                      ? "bg-pink-500 text-white "
                      : "bg-yellow-500 text-white"
                  } px-3 py-1 rounded`}
                  disabled={isRecipeInFavorites(recipe.name)}
                >
                  {isRecipeInFavorites(recipe.name)
                    ? "Favourite"
                    : "Add to Favourite"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
