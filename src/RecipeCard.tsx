import React, { useState} from 'react';
import styled from "styled-components";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import { RuxIcon } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";

interface Recipe {
  image: string;
  title: string;
  description: string;

}

const initialFavorites: Recipe[] = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
    title: "Recipe Title 1",
    description: "Recipe description 1. Long description to test the overflow of the text. Recipe description 1. Long description to test the overflow of the text.Recipe description 1. Long description to test the overflow of the text.Recipe description 1. Long description to test the overflow of the text.Recipe description 1. Long description to test the overflow of the text."
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQzQqVBk7LmMbMSaEuRy3AkVv1lyGqThm4Q&s",
    title: "Recipe Title 2",
    description: "Recipe description 2"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALAGFcVj2zAWMAViVc4z4RQAFQFvO5sKSKw&s",
    title: "Recipe Title 3",
    description: "Recipe description 3"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUXwxKjDkf17YKakug9okRsOuGVhZD8h6RA&s",
    title: "Recipe Title 4",
    description: "Recipe description 3"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVZZkox8oCsYvgrvXyV1mdYUsCRGfqBMoGTA&s",
    title: "Recipe Title 5",
    description: "Recipe description 3"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa00fqLGUjL3fBsJhUkUBN__VP3Mq_1W6NpQ&s",
    title: "Recipe Title 6",
    description: "Recipe description 3"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
    title: "Recipe Title 7",
    description: "Recipe description 3"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
    title: "Recipe Title 8",
    description: "Recipe description 3"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
    title: "Recipe Title 9",
    description: "Recipe description 3"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
    title: "Recipe Title 10",
    description: "Recipe description 3"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
    title: "Recipe Title 11",
    description: "Recipe description 3"
  },

  // Add more recipes as needed
];

const initialRecipes: Recipe[] = [...initialFavorites];

const MyRecipes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-height: 100vh;
  overflow: auto;
  padding-top:100px;
  padding-left:0px;
  padding-right: 0px;
  scrollbar-width: none;
  padding-bottom:50px;
  top:30%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px;
  border-radius: 15px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.61);
  background-color:rgb(255, 255, 255);
  padding: 10px;
  margin-top: 20px;
  margin-left:-13px;
  position: relative;
  max-height:400px;
  min-height: 350px;
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
  background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.2));
  z-index: 2;
`;

const FavorButton = styled.button`
  background: none;
  border: none;
  cursor: pointe
  bottom: 0%;
  margin-top:-4%;
  left: -11px;
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


const RecipeCard: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const handleFavorButtonClick = (index: number) => {
    const recipe = initialFavorites[index];
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.title === recipe.title)) {
        return prevFavorites.filter((fav) => fav.title !== recipe.title);
      } else {
        return [...prevFavorites, recipe].sort((a, b) => a.title.localeCompare(b.title));
      }
    });
  };
const handleViewRecipeClick = (recipe: Recipe) => {
    navigate("/recipeDetails", { state: { recipe } });
  };
  return (
    <MyRecipes>
      <div className="My-recipes-text">
          My Recipes
        </div>
      {initialRecipes.map((recipe, index) => (
        <Card key={index}>
         
         <FavorButton onClick={() => handleFavorButtonClick(index)}>
            <RuxIcon className= "favorbutton_icon" icon={favorites.some((fav) => fav.title === recipe.title) ? "star-border" : "star"} />
          </FavorButton>

          <ImageContainer>
            <StyledImage src={recipe.image} alt="Food" />
            <VignetteOverlay />
          </ImageContainer>
          <h2 className="recipe-title">{recipe.title}</h2>
          <p className="description">{recipe.description}</p>
          <ButtonContainer>
          <button className="view-recipe" onClick={() => handleViewRecipeClick(recipe)}>View Recipe</button>
          </ButtonContainer>
        </Card>
      ))}
    </MyRecipes>
  );
};

export default RecipeCard;