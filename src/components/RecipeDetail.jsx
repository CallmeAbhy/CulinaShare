// src/components/RecipeDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoLogoYoutube } from "react-icons/io";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    // Replace the URL with your actual API endpoint
    axios
      .get(
        `https://restobackend-1.onrender.com/api/recipes/${encodeURIComponent(
          id
        )}`
      )
      .then((response) => setRecipeDetails(response.data))
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      {/* Recipe Details Section */}
      <div className="max-w-2xl mx-auto ">
        <h1 className="text-3xl font-bold mb-4">{recipeDetails.name}</h1>
        <div className="mb-4">
          {/* Display image */}
          <img
            src={recipeDetails.imagelink}
            alt={recipeDetails.name}
            className="w-full h-60 object-cover mb-4"
          />
          {/* Live Demo Button for YouTube link */}
          <a
            href={recipeDetails.youtubelink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 text-white px-4 py-2 rounded inline-flex items-center"
          >
            <IoLogoYoutube className="mr-2" />
            Live Demo
          </a>
        </div>
        {/* Recipe Text */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Recipe:</h2>
          <p>{recipeDetails.Recipe}</p>
        </div>
        {/* Ingredients Table */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
          <table className="table-auto w-full">
            <tbody>
              {recipeDetails.ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{ingredient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
