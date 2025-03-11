import React from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './RecipeCard.css'
import SideBar from "./SideBar";
import MyRecipes from "./RecipeCard";
// import { Authenticator } from '@aws-amplify/ui-react';


const MainPage: React.FC = () => {
  return (
    <>
      <SideBar />
      <div className="my-recipes-text">
          My Recipes
        </div>
        <MyRecipes />
    </>
  );
}

export default MainPage;