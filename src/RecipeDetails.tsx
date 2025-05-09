import React from "react";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import DefaultViteLogo from './assets/vite.svg';
import logo_color from './assets/logo_color.svg';

import {RuxIcon } from "@astrouxds/react";
import SideBar from "./SideBar.tsx";
import "./RecipeDetails.css";
import LSideBar from "./Left_SideBar.tsx";
import { SpoonacularRecipe } from "./types/SpoonacularRecipe";

const RecipeDetails: React.FC = () => {
  const location = useLocation();
  const { recipe } = location.state as { recipe: SpoonacularRecipe };
  const [expanded, setExpanded] = useState(false);

  // Deduplicate ingredients list
  const uniqueIngredients = useMemo(() => {
    if (!recipe.simplifiedInstructions) return [];
    const all = recipe.simplifiedInstructions.flatMap(step => step.ingredients || []);
    return Array.from(new Set(all));  // keep only one of each
  }, [recipe.simplifiedInstructions]);
  
  return (
    <>
      <SideBar />
      <div className="main-con">
        <div className="outer-container">
          <LSideBar recipe={recipe} />
          <div className="title-and-content">
            <h1 className="Title_recipe">{recipe.title}</h1>
            <div className="content-container">
              <div className="text-wrapper">
                <img
                  className="recipe_image"
                  src={recipe.image || logo_color}
                  alt={recipe.title}
                />
                <div className="description-container">
                  <h3 style={{ color: "white" }}>Summary:</h3>
                  <p
                    className={`summary-text ${expanded ? "expanded" : ""}`}
                    dangerouslySetInnerHTML={{
                      __html: recipe.summary
                        ? recipe.summary.replace(/<a /g, '<a style="color: white;" ')
                        : "No summary available."
                    }}
                  />
                </div>
              </div>

              <div className={`button-container ${expanded ? "expanded" : ""}`}>
                <button
                  className="style-button"
                  onClick={() => setExpanded(!expanded)}
                >
                  <RuxIcon
                    icon={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    style={{ color: "rgb(31, 39, 50)" }}
                  />
                </button>
              </div>

              <div className={`expandable-content ${expanded ? "expanded" : ""}`}>
                <h3 style={{ color: "white" }}>Ingredients:</h3>
                {uniqueIngredients.length > 0 ? (
                  // <ul>
                    uniqueIngredients.map((ingredient, idx) => (
                      <li key={ingredient + idx}>{ingredient}</li>
                    ))
                  // </ul>
                ) : (
                  <p>No ingredients available.</p>
                )}

                <h3 style={{ color: "white" }}>Instructions:</h3>
                {recipe.simplifiedInstructions?.map((step, index) => (
                  <p key={index}>{`${step.number}. ${step.step}`}</p>
                )) || <p>No instructions available.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;