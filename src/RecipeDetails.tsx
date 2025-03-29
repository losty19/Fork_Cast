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

const RecipeDetails: React.FC = () => {
  const location = useLocation();
  const { recipe } = location.state as { recipe: Recipe };
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
      <SideBar/>
      <div className="main-con">
        <div className="outer-container">
          <LSideBar/>
          <div className="title-and-content">
          <div className = "Title_recipe">{recipe.title}</div>
          <div className="content-container">
          <div className="text-wrapper">
            <img className="recipe_image" src={recipe.image} alt="Food" />    
              <div className="description-container">
              <p>{recipe.description}</p>
            </div>
          </div>

        <div className={`button-container ${expanded ? "expanded" : ""}`}>
                <button className="style-button" onClick={() => setExpanded(!expanded)}>
                  <RuxIcon icon={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} style={{ color: "rgb(31, 39, 50)" }} />
                </button>
              </div>
  
  <div className={`expandable-content ${expanded ? "expanded" : ""}`}>
    <h3>Ingredients:</h3>
    <li>2 1/4 cups all-purpose flour</li>
                <li>1 tsp salt</li>
                <li>1 tsp sugar</li>
                <li>1 tbsp olive oil</li>
                <li>1 packet (2 1/4 tsp) active dry yeast</li>
                <li>3/4 cup warm water (about 110°F)</li>
                <li>1 cup crushed tomatoes</li>
                <li>1 tbsp olive oil</li>
                <li>1 garlic clove, minced</li>
                <li>1 tsp dried oregano</li>
                <li>1 tsp dried basil</li>
                <li>Salt and pepper, to taste</li>
                <li>1 1/2 cups shredded mozzarella cheese</li>
                <li>1/2 cup sliced pepperoni (or any other topping of choice)</li>
                <li>Fresh basil leaves (optional)</li>
            

              <h3>Instructions:</h3>
              <p>
                1. Sift the dry ingredients together: flour, salt, and sugar.
              </p>
              <p>
                2. Make a well in the center and add the wet ingredients (olive oil, yeast, and warm water).
              </p>
              <p>
                3. Stir to combine until a dough forms. Knead the dough for about 5-7 minutes until smooth.
              </p>
              <p>
                4. Place the dough in a greased bowl, cover, and let rise for 1 hour.
              </p>
              <p>
                5. Preheat your oven to 475°F (245°C).
              </p>
              <p>
                6. Roll out the dough onto a pizza stone or baking sheet.
              </p>
              <p>
                7. Spread the tomato sauce over the dough, sprinkle with cheese, and add toppings.
              </p>
              <p>
                8. Bake for 12-15 minutes, or until the crust is golden and the cheese is bubbly.
              </p>
              </div>
        </div>
        </div>
     
        </div>       
        </div>
    </>
  );
};

export default RecipeDetails;