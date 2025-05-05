import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import './SearchResultsPage.css';
import defaultViteLogo from './assets/vite.svg';
import { RuxIcon, RuxToast } from "@astrouxds/react";
import SideBar from "./SideBar";
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import { getCurrentUser } from "aws-amplify/auth";
import { SpoonacularRecipe } from "./types/SpoonacularRecipe";
import './MainPage.css';
import './RecipeCard.css';

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
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // // Populate the simplifiedInstructions
  // const recipes = rawRecipes.map(recipe => ({
  //   ...recipe,
  //   simplifiedInstructions: transformInstructions(recipe.analyzedInstructions),
  // }));

  // Fetch initial favorited recipes
  React.useEffect(() => {
    const fetchFavoritedRecipes = async () => {
      try {
        const userId = (await getCurrentUser()).userId;
        const { data: savedRecipes } = await client.models.SavedRecipe.list({
          filter: { userId: { eq: userId } },
        });
        setFavoritedIds(savedRecipes.map(recipe => recipe.recipeId ?? ''));
      } catch (error) {
        console.error('Error fetching favorited recipes:', error);
        setToastMessage('Failed to load favorited recipes.');
        setTimeout(() => setToastMessage(null), 3000);
      }
    };
    fetchFavoritedRecipes();
  }, []);

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
      const userId = (await getCurrentUser()).userId;
      const recipeId = recipe.id.toString();
      console.log("(SRP)The recipe.recipeId is: ", recipe.recipeId);
      console.log("(SRP)The recipe.id is: ", recipe.id);
      console.log("(SRP)The recipeId is: ", recipeId);
      console.log("(SRP)The favoritedIds is: ", favoritedIds);


      if (favoritedIds.includes(recipe.recipeId ?? '')) {
        console.log("(SRP) Inside the favoritedIds.includes() block");
        // Remove from favorites
        const { data: savedRecipes } = await client.models.SavedRecipe.list({
          filter: { userId: { eq: userId }, recipeId: { eq: recipe.recipeId ?? '' } },
        });
        if (savedRecipes.length > 0) {
          await client.models.SavedRecipe.delete({ id: savedRecipes[0].id });
          setFavoritedIds(prev => prev.filter(id => id !== recipe.recipeId));
          setToastMessage('Recipe removed from favorites.');
        }
      } else {
        // Add to favorites
        console.log("(SRP) In else: The recipe.recipeId is: ", recipe.recipeId);
        console.log("(SRP) In else: The recipe.id is: ", recipe.id);
        console.log("(SRP) In else: The recipeId is: ", recipeId);
        const simplifiedInstructions = transformInstructions(recipe.analyzedInstructions) || recipe.simplifiedInstructions;
        console.log("(SRP) The simplifiedInstructions is: ", simplifiedInstructions);
        
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
          simplifiedInstructions,
          instructions: recipe.instructions,
        });

        if (errors) {
          console.error('Error saving favorite:', errors);
          setToastMessage('Failed to save recipe to favorites.');
          return;
        }
        setFavoritedIds(prev => [...prev, recipe.recipeId ?? '']);
        setToastMessage('Recipe saved to favorites!');
      }
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      console.error('Error handling favorite:', error);
      setToastMessage('Error handling favorite.');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleBackToMain = () => {
    navigate('/main');
  };

  const handleViewRecipeClick = (recipe: SpoonacularRecipe) => {
    navigate("/recipeDetails", { state: { recipe } });
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
    <div className="main-container">
      <SideBar />
      <h1 className="My-recipes-text">Search Results</h1>
      <MyRecipes>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Card key={recipe.id}>
              <FavorButton onClick={() => handleFavorite(recipe)}>
                <RuxIcon
                  className="favorbutton_icon"
                  size="2.5rem"
                  icon={favoritedIds.includes(recipe.recipeId ?? recipe.id.toString()) ? "star" : "star-border"}
                />
              </FavorButton>
              <ImageContainer>
                <StyledImage src={recipe.image || defaultViteLogo} alt={recipe.title} />
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
        ) : (
          <p>No recipes found. Please try another search.</p>
        )}
      </MyRecipes>
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
      <footer className="footer">
        <p>&copy; 2025 Fork Cast. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SearchResultsPage;