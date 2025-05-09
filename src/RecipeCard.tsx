import React, { useState } from 'react';
import styled from "styled-components";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import defaultViteLogo from './assets/vite.svg';
import logo_color from './assets/logo_color.svg';
import './MainPage.css';
import { RuxIcon, RuxToast } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import { getCurrentUser } from "aws-amplify/auth";
import { SpoonacularRecipe } from './types/SpoonacularRecipe';

const client = generateClient<Schema>();

const MyRecipes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 3rem;
  box-sizing: border-box;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 11rem;
  border-radius: 15px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.61);
  background-color: rgb(255, 255, 255);
  padding: 10px;
  margin: 0.5rem;
  position: relative;
  min-height: 18rem;
  max-height: 20rem;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1);
    z-index: 2;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 7rem;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  height: 7rem;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 5px;
`;

const VignetteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.19));
  z-index: 2;
`;

const FavorButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 3;
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 5px;
`;

interface RecipeCardProps {
  recipes: SpoonacularRecipe[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipes }) => {
  const navigate = useNavigate();
  const [favoritedIds, setFavoritedIds] = useState<string[]>(recipes.map(r => r.recipeId ?? ''));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFavorButtonClick = async (recipe: SpoonacularRecipe) => {
    try {
      const userId = (await getCurrentUser()).userId;
      console.log('(RC) recipe.id: ', recipe.id);
      console.log('(RC) recipe.recipeId: ', recipe.recipeId);
      console.log('(RC) favoritedIds: ', favoritedIds);

      if (favoritedIds.includes(recipe.recipeId ?? '')) {
        // Remove from favorites
        const { data: savedRecipes } = await client.models.SavedRecipe.list({
          filter: { userId: { eq: userId }, recipeId: { eq: recipe.recipeId ?? '' } },
        });
        if (savedRecipes.length > 0) {
          await client.models.SavedRecipe.delete({ id: savedRecipes[0].id });
          setFavoritedIds(prev => prev.filter(id => id !== recipe.recipeId));
        }
      } else {

        // Add to favorites
        const { errors, data: newRecipe } = await client.models.SavedRecipe.create({
          recipeId: recipe.recipeId,
          userId,
          title: recipe.title,
          image: recipe.image,
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
          cuisines: recipe.cuisines,
          dishTypes: recipe.dishTypes,
          diets: recipe.diets,
          occasions: recipe.occasions,
          simplifiedInstructions: recipe.simplifiedInstructions,
          instructions: recipe.instructions,
        });


        if (errors) {
          console.error('Error saving favorite:', errors);
          console.log("(RC) There was an error saving the recipe to favorites.", errors);
          setToastMessage('Error saving recipe to favorites.');
          return;
        }
        setFavoritedIds(prev => [...prev, recipe.recipeId ?? '']);
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };


  const handleViewRecipeClick = (recipe: SpoonacularRecipe) => {
    navigate("/recipeDetails", { state: { recipe } });
  };

  return (
    <MyRecipes>
      {recipes.length === 0 ? (
        <p>No saved recipes found. Try adding some from the search page!</p>
      ) : (
        recipes.map((recipe) => (
          <Card key={recipe.id}>
            <FavorButton onClick={() => handleFavorButtonClick(recipe)}>
              <RuxIcon
                className="favorbutton_icon"
                size="2.5rem"
                icon={favoritedIds.includes(recipe.recipeId ?? '') ? "star" : "star-border"}
              />
            </FavorButton>
            <ImageContainer>
              <StyledImage src={recipe.image || logo_color} alt={recipe.title} />
              <VignetteOverlay />
            </ImageContainer>
            <h2 className="recipe-title">{recipe.title}</h2>
            <p
              className="description"
              dangerouslySetInnerHTML={{
              __html: recipe.summary
                ? recipe.summary.substring(0, 100) + '...'
                : '',
              }}
            ></p>
            <ButtonContainer>
              <button className="view-recipe" onClick={() => handleViewRecipeClick(recipe)}>
                View Recipe
              </button>
            </ButtonContainer>
          </Card>
        ))
      )}
      {toastMessage && (
          <div style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: 'fit-content',
            maxWidth: '90%',
          }}>
            <RuxToast
              message={toastMessage}
              closeAfter={3000}
              style={{
                backgroundColor: '#e27e36',
                color: '#ffffff',
                fontFamily: 'Cambria, Cochin',
                fontSize: '1rem',
                padding: '10px 20px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            />
          </div>
        )}
    </MyRecipes>
  );
};

export default RecipeCard;