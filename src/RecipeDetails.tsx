import React from "react";
import { useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import {RuxIcon } from "@astrouxds/react";
import SideBar from "./SideBar.tsx";
import styled from "styled-components";
import "./RecipeDetails.css";
import LSideBar from "./Left_SideBar.tsx";


interface Recipe {
  image: string;
  title: string;
  description: string;
  extraContent: string;
}

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 100vh;
  overflow: auto;
  scrollbar-width: none;
  position:relative;
  top:50px;
`;

const OuterContainer = styled.div`
  flex-direction: column;
  padding: 20px;
  background-color:rgb(50, 41, 35);
  border-radius: 15px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.64);
  margin-top: 5%;
  margin-bottom:5%;
  font-size: 200%;
  overflow-y: hidden;
  padding-right:90px;
`;

const ContentContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center; 
  padding: 20px;
  position:relative;
  background-color:rgb(241, 136, 61);
  border-radius: 10px;
  
  
`;

const ExpandableContent = styled.div<{ expanded: boolean }>`
  margin-top: -15px;
  padding: 10px;
  padding-bottom:3%;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  width: 1100px;
  display: ${({ expanded }) => (expanded ? "block" : "none")};
`;
const ButtonContainer = styled.div<{ expanded: boolean }>`
  display: flex;
  position:relative;
  justify-content: center;
  margin-top: ${({ expanded }) => (expanded ? "-3%" : "-1%")};
  margin-bottom: ${({ expanded }) => (expanded ? "-1%" : "-3%")};
  position: ${({ expanded }) => (expanded ? "absolute" : "relative")};
  bottom: ${({ expanded }) => (expanded ? "0" : "auto")}; 
`;
const StyleButton = styled.button`
  background:none;
  padding: 0px;
  margin:0;
  border: none;
  cursor: pointer;
  z-index: 3;
  &:hover {
    transform:scale(1.2);
  }
  &:focus {
    outline: none;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;


const RecipeDetails: React.FC = () => {
  const location = useLocation();
  const { recipe } = location.state as { recipe: Recipe };
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
      <SideBar/>
      <MainContainer>
        <LSideBar/>
        <OuterContainer>
          <div className = "Title_recipe">{recipe.title}</div>
          <ContentContainer>
  
  <TextWrapper>
            <img className="recipe_image" src={recipe.image} alt="Food" />    
              <div className="description-container">
              <p>{recipe.description}</p>
            </div>
  </TextWrapper>

  <ButtonContainer expanded={expanded}>
    <StyleButton onClick={() => setExpanded(!expanded)}>
    <RuxIcon icon={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} style={{ color: 'rgb(31, 39, 50)' }} />
    </StyleButton>
  </ButtonContainer>
  <ExpandableContent expanded={expanded}>
    <h1>Ingredients:</h1>
    <li>2 1/4 cups all-purpose flour</li>
                <li>1 tsp salt</li>
                <li>1 tsp sugar</li>
                <li>1 tbsp olive oil</li>
                <li>1 packet (2 1/4 tsp) active dry yeast</li>
                <li>3/4 cup warm water (about 110°F)</li>
                <li>1 cup crushed tomatoes</li>
                <li>1 tbsp olive oil</li>
                <li>1 garlic clove, minced</li>
                <li>1 tsp dried oregano</li>
                <li>1 tsp dried basil</li>
                <li>Salt and pepper, to taste</li>
                <li>1 1/2 cups shredded mozzarella cheese</li>
                <li>1/2 cup sliced pepperoni (or any other topping of choice)</li>
                <li>Fresh basil leaves (optional)</li>
            

              <h1>Instructions:</h1>
              <p>
                1. Sift the dry ingredients together: flour, salt, and sugar.
              </p>
              <p>
                2. Make a well in the center and add the wet ingredients (olive oil, yeast, and warm water).
              </p>
              <p>
                3. Stir to combine until a dough forms. Knead the dough for about 5-7 minutes until smooth.
              </p>
              <p>
                4. Place the dough in a greased bowl, cover, and let rise for 1 hour.
              </p>
              <p>
                5. Preheat your oven to 475°F (245°C).
              </p>
              <p>
                6. Roll out the dough onto a pizza stone or baking sheet.
              </p>
              <p>
                7. Spread the tomato sauce over the dough, sprinkle with cheese, and add toppings.
              </p>
              <p>
                8. Bake for 12-15 minutes, or until the crust is golden and the cheese is bubbly.
              </p>
              </ExpandableContent>
</ContentContainer>
          
     
        </OuterContainer>        
      </MainContainer>
    </>
  );
};

export default RecipeDetails;