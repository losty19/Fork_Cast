import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { RuxIcon } from "@astrouxds/react"; // Currently not used
import SideBar from "./SideBar";
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import { getCurrentUser } from "aws-amplify/auth";

// interface Recipe {
//   id: number;
//   title: string;
//   image: string;
//   description: string;
// }

const MyRecipes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-height: 100vh;
  overflow: auto;
  padding: 50px;
  scrollbar-width: none;
  top:30%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  border-radius: 20px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.76);
  background-color: rgba(140, 124, 194);
  padding: 10px;
  margin: 0px;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  min-height:100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 20px;
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
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #ff4500;
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
  const { recipes } = location.state?.recipes || [];

  const handleFavorite = async (recipe: any) => {
    try {
      const { userId } = await getCurrentUser();
      const response = await client.mutations.SaveFavoriteRecipe({
        recipeId: recipe.id,
        userId,
        title: recipe.title,
        image: recipe.image,
      });
      
      console.log('Recipe saved successfully: ', response.data);
    } catch (error) {
      console.error('Error saving favorite: ', error);
    }
  };

  const handleBackToMain = () => {
    navigate('/main');
  };

  return (
    <div>
      <SideBar />
      <MyRecipes>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe: any) => (
            <Card key={recipe.id}>
              <ImageContainer>
                <StyledImage src={recipe.image} alt={recipe.title} />
                <VignetteOverlay />
              </ImageContainer>
              <h3>{recipe.title}</h3>
              <FavoriteButton onClick={() => handleFavorite(recipe)}>Favorite</FavoriteButton>
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