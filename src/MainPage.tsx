import React from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './RecipeCard.css'
import SideBar from "./SideBar";
import MyRecipes from "./RecipeCard";
// import { Authenticator } from '@aws-amplify/ui-react';

// AI imports // 
import { AIConversation, createAIHooks } from "@aws-amplify/ui-react-ai";
// import { useAIConversation } from "./client";
// import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import outputs from "../amplify_outputs.json";
import { Schema } from "../amplify/data/resource";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";

// Amplify.configure(outputs);
const client = generateClient<Schema>({ authMode: "userPool" });
const { useAIConversation } = createAIHooks(client);


const DataContext = React.createContext<{
  data: any;
  setData: (value: React.SetStateAction<any>) => void;
}>({ data: {}, setData: () => {} });

function AIchatbot() {
  const { user } = useAuthenticator((context) => [context.user]);
  if (!user) {
    return <div>Please sign in to use AI chatbot.</div>;
  }

  const { data } = React.useContext(DataContext);
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation('conversationAI');

  return (
    <Authenticator>
      <AIConversation
        messages={messages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
        welcomeMessage="Hello! I'm your AI assistant. How can I help you today?"
        displayText={{
          getMessageTimestampText: (date) => new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
            hour12: true,
            timeZone: 'EST',
          }).format(date)
        }}
        aiContext={() => {
          return {
            ...data,
          };
        }}
        FallbackResponseComponent={(props) => {
          return <>{JSON.stringify(props)}</>
        }}
      />
    </Authenticator>
  );
}

const MainPage: React.FC = () => {
  return (
    <>
      <SideBar />
      <div className="my-recipes-text">
          My Recipes
      </div>
      <br>
      </br>
      <AIchatbot />
      <MyRecipes />
    </>
  );
}

export default MainPage;