import React, { useState } from 'react';
import styled from "styled-components";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import { RuxIcon } from "@astrouxds/react";
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
  max-height: 100vh;
  overflow: auto;
  padding-top:18vh;
  scrollbar-width:none;
  padding-bottom:1rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 11rem;
  border-radius: 15px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.61);
  background-color:rgb(255, 255, 255);
  padding: 10px;
  margin-top: 20px;
  margin-left:0.25rem;
  margin-right:0.25rem;

  position: relative;
  max-height:20rem;
  min-height: 18rem;
  transition: transform 0.5s ease;
  &:hover {
    transform:scale(1.1);
    z-index:2;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  min-height:100%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  min-height: 7rem;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: -15px;
  `;

const VignetteOverlay = styled.div`
  content: '';
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
  cursor: pointe;
  margin-top:-0.2rem;
  margin-left: -0.5rem;
  position: absolute;
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
  padding-top: 7px;
`;

interface RecipeCardProps {
  recipes: SpoonacularRecipe[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipes }) => {
  const navigate = useNavigate();
  const [favoritedIds, setFavoritedIds] = useState<number[]>(recipes.map(r => r.id));

  const handleFavorButtonClick = async (recipe: SpoonacularRecipe) => {
    try {
      const userId = (await getCurrentUser()).userId;
      if (favoritedIds.includes(recipe.id)) {
        // Remove from favorites
        const { data: savedRecipes } = await client.models.SavedRecipe.list({
          filter: { userId: { eq: userId }, recipeId: { eq: recipe.id.toString() } },
        });
        if (savedRecipes.length > 0) {
          await client.models.SavedRecipe.delete({ id: savedRecipes[0].id });
          setFavoritedIds(prev => prev.filter(id => id !== recipe.id));
        }
      } else {

        // Add to favorites
        const { errors, data: newRecipe } = await client.models.SavedRecipe.create({
          recipeId: recipe.id.toString(),
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
          return;
        }
        setFavoritedIds(prev => [...prev, recipe.id]);
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
      <div className="My-recipes-text">
        My Recipes
      </div>
      {recipes.length === 0 ? (
        <p>No saved recipes found. Try adding some from the search page!</p>
      ) : (
        recipes.map((recipe) => (
          <Card key={recipe.id}>
            <FavorButton onClick={() => handleFavorButtonClick(recipe)}>
              <RuxIcon
                className="favorbutton_icon"
                size="2.5rem"
                icon={favoritedIds.includes(recipe.id) ? "star" : "star-border"}
              />
            </FavorButton>
            <ImageContainer>
              <StyledImage src={recipe.image || 'https://via.placeholder.com/150'} alt={recipe.title} />
              <VignetteOverlay />
            </ImageContainer>
            <h2 className="recipe-title">{recipe.title}</h2>
            <p className="description">{recipe.summary?.substring(0,100) + '...'}</p>
            <ButtonContainer>
              <button className="view-recipe" onClick={() => handleViewRecipeClick(recipe)}>
                View Recipe
              </button>
            </ButtonContainer>
          </Card>
        ))
      )}
    </MyRecipes>
  );
};

export default RecipeCard;