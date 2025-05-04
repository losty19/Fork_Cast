import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import './SearchResultsPage.css';
// import { RuxIcon } from "@astrouxds/react"; // Currently not used
import SideBar from "./SideBar";
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import { getCurrentUser } from "aws-amplify/auth";
import { SpoonacularRecipe } from "./types/SpoonacularRecipe";

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
  border-radius: 20px;
  background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.5));
  z-index: 2;
`;

const FavoriteButton = styled.button`
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

const BackButton = styled.button`
  background-color: #4682b4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #4169e1;
  }
`;

const client = generateClient<Schema>();

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipes: SpoonacularRecipe[] = location.state?.recipes || [];

  const transformInstructions = (
    analyzedInstructions?: Array<{
      name?: string | null;
      steps?: Array<{
        number?: number | null;
        step?: string | null;
        ingredients?: Array<{
          id?: number | null;
          name?: string | null;
          localizedName?: string | null;
          image?: string | null;
        }> | null;
      }> | null;
    }> | null
  ) => {
    if (!analyzedInstructions) return null;
    return analyzedInstructions
      .flatMap(instruction =>
        instruction.steps?.map(step => ({
          number: step.number ?? 0,
          step: step.step ?? '',
          ingredients: step.ingredients?.filter(ing => ing?.name).map(ing => ing!.name!) ?? [],
        })) ?? []
      )
      .filter(step => step.step); // Remove steps with empty step text
  };

  const handleFavorite = async (recipe: SpoonacularRecipe) => {
    try {
      // This sends data to DynamoDB model
      const userId = (await getCurrentUser()).userId;
      // Convert the API response of analyzedInstructions to a simplified format I created
      const simplifiedInstructions = transformInstructions(recipe.analyzedInstructions);
      
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
        simplifiedInstructions: simplifiedInstructions,
        instructions: recipe.instructions,
      });

      if (errors) {
        console.error('Error saving favorite:', errors);
        return;
      }
      console.log('Recipe saved successfully: ', newRecipe);
    } catch (error) {
      console.error('Error saving favorite: ', error);
    }
  };

  const handleBackToMain = () => {
    navigate('/main');
  };

  // Ensure recipes is an array
  if (!Array.isArray(recipes)) {
    console.error('Recipes is not an array:', recipes);
    return (
      <div>
        <SideBar />
        <div>
          <p>Error: Invalid recipe data received.</p>
          <BackButton onClick={handleBackToMain}>Back to Main</BackButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SideBar />
      <MyRecipes>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Card key={recipe.id}>
              <ImageContainer>
                <StyledImage src={recipe.image || '/vite.svg'} alt={recipe.title} />
                <VignetteOverlay />
              </ImageContainer>
              <h3>{recipe.title}</h3>
              <FavoriteButton onClick={() => handleFavorite(recipe)}>
                Favorite
              </FavoriteButton>
            </Card>
          ))
        ) : (
          <div>
            <p>No recipes found. Please try again.</p>
            <BackButton onClick={handleBackToMain}>Back to Main</BackButton>
          </div>
        )}
      </MyRecipes>
    </div>
  );
};

export default SearchResultsPage;