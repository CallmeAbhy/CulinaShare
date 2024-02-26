import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch favorites data from the backend
    axios
      .get("https://restobackend-1.onrender.com/api/favorites")
      .then((response) => setFavorites(response.data))
      .catch((error) => console.error("Error fetching favorites:", error));
  }, []);

  const handleViewDetails = (recipeName) => {
    navigate(`/recipe/${encodeURIComponent(recipeName)}`);
  };

  const handleRemoveFromFavorites = (recipeName) => {
    // Send a request to remove the recipe from favorites
    axios
      .delete(
        `https://restobackend-1.onrender.com/api/favorites/${encodeURIComponent(
          recipeName
        )}`
      )
      .then(() => {
        // If the removal is successful, update the state to reflect the changes
        setFavorites((prevFavorites) =>
          prevFavorites.filter((recipe) => recipe.name !== recipeName)
        );
        console.log(`Removed ${recipeName} from favorites!`);
      })
      .catch((error) => console.error("Error removing from favorites:", error));
  };

  return (
    <div className="container mx-auto mt-16 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {favorites.map((recipe) => (
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
                  onClick={() => handleRemoveFromFavorites(recipe.name)}
                  className="bg-red-800 text-white px-3 py-1 rounded"
                >
                  Remove From Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
