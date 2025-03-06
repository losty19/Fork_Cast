import React from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './RecipeCard.css'
import SideBar from "./SideBar";
import MyRecipes from "./RecipeCard";
// import { Authenticator } from '@aws-amplify/ui-react';
// import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {

  return (
    <>
      <SideBar />
      <button onClick={() => (window.location.href = "/main")}>
      <div className="logo-text">
          ForkCast
        </div>
        </button>
        <MyRecipes />
    </>
  );
}

export default MainPage;


