import React from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './RecipeCard.css'
import SideBar from "./SideBar";
import MyRecipes from "./RecipeCard";
// import { Authenticator } from '@aws-amplify/ui-react';

import { AIConversation } from "@aws-amplify/ui-react-ai";
import { useAIConversation } from "./client";

const MainPage: React.FC = () => {

  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation('conversationAI');


  return (
    <>
      <SideBar />
      <div className="my-recipes-text">
          My Recipes
        </div>
        <AIConversation
          messages={messages}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
        />
        <br>
        </br>
        <MyRecipes />
    </>
  );
}

export default MainPage;