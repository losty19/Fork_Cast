import React from "react";
import { useState } from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './RecipeCard.css'
import SideBar from "./SideBar";
import MyRecipes from "./RecipeCard";
// import { Authenticator } from '@aws-amplify/ui-react';
import { RuxIcon, RuxInput, RuxButton, RuxDialog } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import type { Schema } from '../amplify/data/resource';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import outputs from '../amplify_outputs.json';  // Make sure this is updated with newest functions/tables

Amplify.configure(outputs);
const client = generateClient<Schema>()

interface RuxInputEvent extends Event {
  target: HTMLInputElement;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMealRequestOpen, setIsMealRequestOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();

  const buttonPressed = () => {
    setIsMealRequestOpen(!isMealRequestOpen);
  }

  const handleInputChange = (e: RuxInputEvent) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    console.log("Input Value: ", inputValue);
    try {
      const spoonacular_response = await client.queries.SpoonacularGetRecipe({
        path: '/recipes/search', 
        httpMethod: 'GET', 
        queryStringParameters: {query: inputValue},
        pathParameters: {}
      });
      console.log("spoonacular_response is: ", spoonacular_response);
      if (spoonacular_response.data) {
        // const recipes = spoonacular_response.data.body as Schema["GetRecipeResponse"];
        navigate('/searchResults', { state: { recipes:  spoonacular_response.data } });
      } else {
        console.error('Error searching recipes: Invalid response format. This is spoonacular_response: ', spoonacular_response);
      }
    } catch (error) {
      setError('Failed to fetch recipe');
      console.error('Error searching recipes:', error);
    } finally {
      setIsLoading(false);
      setIsMealRequestOpen(false);
    }
  }

  const handleDialogClose = () => {
    setIsMealRequestOpen(false);
  }

  return (
    <>
      <SideBar />
      <div className="my-recipes-text">
          My Recipes
        </div>
        <MyRecipes />
      <div className="meal-request">
        <button className="icon-button" onClick={buttonPressed}>
          <RuxIcon size="normal" icon="add-circle"></RuxIcon>
        </button>
        <div className="button-text-meal-request">
          Meal Request
        </div>
      </div> 

      {isMealRequestOpen && (
        <RuxDialog 
          className="meal-request-container" 
          open={isMealRequestOpen} 
          header="Meal Request" 
          message="Content goes here" 
          confirmText=""
          denyText=""
          onRuxdialogclosed={handleDialogClose}
        >
          <RuxInput class="MRInput" type="text" value={inputValue} onRuxchange={(e) => handleInputChange(e as unknown as RuxInputEvent)}/>
          <div className="dialog-buttons">
            <RuxButton className="mrCancel" onClick={handleDialogClose}>Cancel</RuxButton>
            <RuxButton className="mrSubmit" onClick={handleSubmit}>Submit</RuxButton>
          </div>
        </RuxDialog>
      )}

      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
    </>
  );
}

export default MainPage;


