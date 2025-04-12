import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import {RuxIcon } from "@astrouxds/react";
import SideBar from "./SideBar.tsx";
import "./RecipeDetails.css";
import LSideBar from "./Left_SideBar.tsx";


interface Recipe {
  image: string;
  title: string;
  description: string;
  extraContent: string;
}
interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  summary: string;
  instructions: string;
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    original: string;
  }>;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

  

const RecipeDetails: React.FC = () => {
  const location = useLocation();
  const { recipe } = location.state as { recipe: SpoonacularRecipe };
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
      <SideBar/>
      <div className="main-con">
        <div className="outer-container">
          <LSideBar recipe={recipe}/>
          <div className="title-and-content">
          <div className = "Title_recipe">{recipe.title}</div>
          <div className="content-container">
          <div className="text-wrapper">
            <img className="recipe_image" src={recipe.image} alt="Food" />    
              <div className="description-container">
              <p>{recipe.summary}</p>
            </div>
          </div>

        <div className={`button-container ${expanded ? "expanded" : ""}`}>
                <button className="style-button" onClick={() => setExpanded(!expanded)}>
                  <RuxIcon icon={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} style={{ color: "rgb(31, 39, 50)" }} />
                </button>
              </div>
  
  <div className={`expandable-content ${expanded ? "expanded" : ""}`}>
    <h3 style={{color:"white"}}>Ingredients:</h3>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient.original}</li>
        ))}
              <h3 style={{color:"white"}}>Instructions:</h3>
              <p>{recipe.instructions}</p>
              </div>
        </div>
        </div>
     
        </div>       
        </div>
    </>
  );
};

export default RecipeDetails;