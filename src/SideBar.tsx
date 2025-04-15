// import React from "react"; // Wasn't being used so I commented it out for 'npm run build'
// import { useState } from "react"; // Wasn't being used so I commented it out for 'npm run build'
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
// import { Authenticator } from '@aws-amplify/ui-react';
// import { RuxIcon, RuxInput, RuxButton, RuxDialog } from "@astrouxds/react"; // Wasn't being used so I commented it out for 'npm run build'
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { useState } from "react";
import { RuxIcon, RuxDialog, RuxInput, RuxButton} from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>()

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

interface SpoonacularResponse {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

interface RuxInputEvent extends Event {
  target: HTMLInputElement;
}

const SideBar = () => {
    const [isMealRequestOpen, setIsMealRequestOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
 
    const navigate = useNavigate();

    const buttonPressed = () => {
      setIsMealRequestOpen(!isMealRequestOpen);
    }

    const handleInputChange = (e: RuxInputEvent) => {
      setInputValue(e.target.value);
    }
  
    const handleSubmit = async () => {
      setIsLoading(true);
      setError(null);
      console.log("Input Value:", inputValue);
  
      try {
        console.log("Making Spoonacular API request...");
        const response = await client.queries.SpoonacularGetRecipe({
          path: '/recipes/complexSearch',
          httpMethod: 'GET',
          queryStringParameters: { 
            query: inputValue,
            number: 5,
            instructionsRequired: true,
            addRecipeInformation: true,
            fillIngredients: true,
            addRecipeNutrition: true,
          },
          pathParameters: {},
        });
        console.log("Raw API Response:", response);
  
        if (response.data) {
          const recipes = response.data as SpoonacularResponse;
          console.log("Parsed Recipes Data:", recipes);
          
          if (recipes.results && Array.isArray(recipes.results)) {
            console.log("Found recipes:", recipes.results.length);
            navigate('/searchResults', { state: { recipes: recipes.results } });
          } else {
            console.error("Invalid recipe data format:", recipes);
            setError('Invalid recipe data format received');
          }
        } else {
          console.error("No data in response:", response);
          setError('No data returned from Spoonacular');
        }
      } catch (error) {
        console.error("Detailed error:", error);
        setError('Failed to fetch recipes');
      } finally {
        setIsLoading(false);
        setIsMealRequestOpen(false);
      }
    };
    /*
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
          const data = typeof spoonacular_response.data === 'string'
            ? JSON.parse(spoonacular_response.data)
            : spoonacular_response.data;
          console.log("Parsed Data:", data);

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
    }*/


    const handleDialogClose = () => {
      setIsMealRequestOpen(false);
    }

    return (
      <>
        
    <div className="main-container">
      <button onClick={() => navigate("/main")}>
            <div className="logo-text">ForkCast</div>
              </button>
          <div className="sidebar">
            <button className="icon-button" onClick={buttonPressed}>
              <RuxIcon className="icon-image" size="35px" icon="add-circle-outline"></RuxIcon>
            </button>
            <button className="icon-button" onClick={() => navigate("/grocery-list")}>
              <RuxIcon className="icon-image" size="small" icon="local-grocery-store"></RuxIcon>
            </button>
            <button className="icon-button" onClick={() => navigate("/profile")}>
              <RuxIcon className="icon-image" size="small" icon="account-circle"></RuxIcon>
            </button>
            <button className="icon-button" onClick={() => navigate("/")}>
              <RuxIcon className="icon-image"size="small" icon="settings"></RuxIcon>
            </button>
          </div>
          <div className="content">
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
export default SideBar;  