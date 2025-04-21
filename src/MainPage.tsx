import React from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './RecipeCard.css'
import SideBar from "./SideBar";
import MyRecipes from "./RecipeCard";
// import { Authenticator } from '@aws-amplify/ui-react';

import { AIConversation } from "@aws-amplify/ui-react-ai";
import { useAIConversation } from "./client";
// import { Authenticator } from '@aws-amplify/ui-react';



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
        <br>
        </br>
      {/* <Authenticator> */}
        <AIConversation
          messages={messages}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
          welcomeMessage="Hello! I'm your AI assistant. How can I help you today?"
          />
      {/* </Authenticator> */}
        <MyRecipes />
    </>
  );
}

export default MainPage;