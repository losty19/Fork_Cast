import React, { useState, useEffect } from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './RecipeCard.css'
import SideBar from "./SideBar";
import MyRecipes from "./RecipeCard";
// import { Authenticator } from '@aws-amplify/ui-react';

// AI imports // 
// import { AIConversation, createAIHooks } from "@aws-amplify/ui-react-ai";
// import { useAIConversation } from "./client";
// import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
// import outputs from "../amplify_outputs.json";
import { Schema } from "../amplify/data/resource";
import { getCurrentUser } from "aws-amplify/auth";
import { SpoonacularRecipe } from "./types/SpoonacularRecipe"

const client = generateClient<Schema>();

const MainPage: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [recipes, setRecipes] = useState<SpoonacularRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }
      try {
        const getCurrUserId = (await getCurrentUser()).userId;
        const { data, errors } = await client.models.SavedRecipe.list({
          filter: { userId: { eq: getCurrUserId } },
        });

        if (errors) {
          setError('Error fetching saved recipes: ' + JSON.stringify(errors));
          setLoading(false);
          return;
        }

        // Map SavedRecipe to SpoonacularRecipe interface ( in /src/types/SpoonacularRecipe.ts )
        const mappedRecipes = data.map((recipe) => ({
          id: recipe.recipeId ? parseInt(recipe.recipeId, 10) : 0, // Convert to number or use a default value
          recipeId: recipe.recipeId ?? null,
          title: recipe.title ?? "Untitled Recipe", // Provide a default value for null
          image: recipe.image ?? "", // Provide a default value for null
          imageType: recipe.image?.split('.').pop(),
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          summary: recipe.summary,
          vegetarian: recipe.vegetarian,
          vegan: recipe.vegan,
          glutenFree: recipe.glutenFree,
          dairyFree: recipe.dairyFree,
          veryHealthy: recipe.veryHealthy,
          cheap: recipe.cheap,
          veryPopular: recipe.veryPopular,
          sustainable: recipe.sustainable,
          lowFodmap: recipe.lowFodmap,
          weightWatcherSmartPoints: recipe.weightWatcherSmartPoints,
          gaps: recipe.gaps,
          preparationMinutes: recipe.preparationMinutes,
          cookingMinutes: recipe.cookingMinutes,
          aggregateLikes: recipe.aggregateLikes,
          healthScore: recipe.healthScore,
          creditsText: recipe.creditsText,
          license: recipe.license,
          sourceName: recipe.sourceName,
          pricePerServing: recipe.pricePerServing,
          cuisines: recipe.cuisines?.filter((cuisine): cuisine is string => cuisine !== null) ?? null,
          dishTypes: recipe.dishTypes?.filter((dishType): dishType is string => dishType !== null) ?? null,
          diets: recipe.diets?.filter((diet): diet is string => diet !== null) ?? null,
          occasions: recipe.occasions?.filter((occasion): occasion is string => occasion !== null) ?? null,
          simplifiedInstructions: recipe.simplifiedInstructions?.map((instruction) => ({
            number: instruction?.number ?? null,
            step: instruction?.step ?? null,
            ingredients: instruction?.ingredients?.filter((ingredient): ingredient is string => ingredient !== null) ?? null,
          })) ?? null,
          instructions: recipe.instructions ?? "", // Provide a default value for null
        }));

        setRecipes(mappedRecipes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch saved recipes: ' + (err instanceof Error ? err.message : 'Unknown error'));
        setLoading(false);
      }
    };
    fetchSavedRecipes();
  }, [user]);

  return (
    <>
      <SideBar />
      <div className="main-container">
      <h1 className="my-recipes-text">My Recipes</h1>
      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MyRecipes recipes={recipes} />
      )}
      </div>
      <footer className="footer">
      <p>&copy; 2025 ForkCast. All rights reserved.</p>
      </footer>
    </>
  );
};

export default MainPage;