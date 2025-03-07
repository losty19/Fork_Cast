import React from "react";
import { useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import {RuxIcon } from "@astrouxds/react";
import SideBar from "./SideBar.tsx";
import styled from "styled-components";
import "./RecipeDetails.css";
import Left_SideBar from "./Left_SideBar.tsx";



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
  padding: 10px;
  scrollbar-width: none;
  position:relative;

`;

const OuterContainer = styled.div`
  flex-direction: column;
  padding: 20px;
  background-color: rgb(13, 39, 50);
  border-radius: 15px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.64);
  margin-top: 5%;
  margin-bottom:-150;
  font-size: 200%;
  overflow-y: hidden;
  padding-right:90px;
  margin-left:5%;
  max-width:1200px;
`;

const ContentContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center; 
  padding: 20px;
  position:relative;
  background-color: rgb(140, 124, 194);
  border-radius: 10px;
  
`;


const ExpandableContent = styled.div<{ expanded: boolean }>`
  margin-top: -15px;
  padding: 10px;
  padding-bottom:5%;
  background-color: rgb(140, 124, 194);
  border-radius: 10px;
  color: white;
  font-size: 18px;
  display: ${({ expanded }) => (expanded ? "block" : "none")};
`;
const ButtonContainer = styled.div<{ expanded: boolean }>`
  display: flex;
  position:relative;
  justify-content: center;
  margin-top: ${({ expanded }) => (expanded ? "0%" : "-3%")};
  margin-bottom: ${({ expanded }) => (expanded ? "-1%" : "-3%")};
  position: ${({ expanded }) => (expanded ? "absolute" : "relative")};
  bottom: ${({ expanded }) => (expanded ? "0" : "auto")}; 
`;
const StyleButton = styled.button`
  background:none;
  padding: 0px;
  margin:0;
  border: none;
  cursor: pointe
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
  const navigate = useNavigate();


  return (
    <>
      <SideBar/>
      
      <Left_SideBar/>
      
      <MainContainer>
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
  <ExpandableContent expanded={expanded}>Pancake Ingredients
You likely already have everything you need to make this pancake recipe. If not, here's what to add to your grocery list:

· Flour: This homemade pancake recipe starts with all-purpose flour.
· Baking powder: Baking powder, a leavener, is the secret to fluffy pancakes.
· Sugar: Just a tablespoon of white sugar is all you'll need for subtly sweet pancakes.
· Salt: A pinch of salt will enhance the overall flavor without making your pancakes taste salty.
· Milk and butter: Milk and butter add moisture and richness to the pancakes.
· Egg: A whole egg lends even more moisture. Plus, it helps bind the pancake batter together.

How to Make Pancakes From Scratch
It's not hard to make homemade pancakes — you just need a good recipe. That's where we come in! You'll find the step-by-step recipe below, but here's a brief overview of what you can expect:

1. Sift the dry ingredients together. Scratch
It's not hard to make homemade pancakes — you just need a good recipe. That's where we come in! You'll find the step-by-step recipe below, but here's a brief overview of what you can expect:
It's not hard to make homemade pancakes — you just need a good recipe. That's where we come in! You'll find the step-by-step recipe below, but here's a brief overview of what you can expect:

1. Sift the dry ingredients togeth Scratch
It's not hard to make homemade pancakes — you just need a good recipe. That's where we come in! You'll find the step-by-step recipe below, but here's a brief overview of what you can expect:

1. Sift the dry ingredients togeth Scratch
It's not hard to make homemade pancakes — you just need a good recipe. That's where we come in! You'll find the step-by-step recipe below, but here's a brief overview of what you can expect:

1. Sift the dry ingredients togeth Scratch
It's not hard to make homemade pancakes — you just need a good recipe. That's where we come in! You'll find the step-by-step recipe below, but here's a brief overview of what you can expect:

1. Sift the dry ingredients togeth Scratch
It's not hard to make homemade pancakes — you just need a good recipe. That's where we come in! You'll find the step-by-step recipe below, but here's a brief overview of what you can expect:

1. Sift the dry ingredients togeth
2. Make a well, then add the wet ingredients. Stir to combine...</ExpandableContent>
</ContentContainer>
          
     
        </OuterContainer>        
      </MainContainer>
    </>
  );
};

export default RecipeDetails;