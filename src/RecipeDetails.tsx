import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import {RuxIcon } from "@astrouxds/react";
import SideBar from "./SideBar";
import styled from "styled-components";


interface Recipe {
  image: string;
  title: string;
  description: string;
  extraContent: string;
}

const RecipeImage = styled.img`
  width:50%;
  height: 40%;
  margin-right: 20px;
  float:left;
  margin-right:1rem;
  margin-bottom:2rem;
`;


const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 100vh;
  overflow: auto;
  padding: 30px;
  scrollbar-width: none;
`;

const OuterContainer = styled.div`
  flex-direction: column;
  padding: 20px;
  justify-content:center;
  background-color: rgb(13, 39, 50);
  border-radius: 15px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.64);
  margin-top: 5%;
  margin-left:5%; 
  margin-bottom:-150;
  font-size: 200%;
  overflow-y: hidden;
  position: relative;
`;

const ContentContainer = styled.div`
  display:flex;
  padding: 20px;
  position:relative;
  background-color: rgb(140, 124, 194);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
`;

const DescriptionContainer = styled.div`

  margin-right:-12%;
  margin-top:-10;
  color: white;
  font-size: 60%; 
  float:left;
`;
const ExpandableContent = styled.div<{ expanded: boolean }>`
  margin-top: 20px;
  padding: 10px;
  background-color: rgb(100, 90, 150);
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 18px;
  display: ${({ expanded }) => (expanded ? "block" : "none")};
  transition: max-height 0.3s ease-out;
`;

const StyleButton = styled.button`
  background: none;
  border: none;
  cursor: pointe
  position: absolute;
  transform: translate(-100%, 50%); /* Ensures full centering */
  
  z-index: 3;
  
  &:focus {
    outline: none;
  }
`;
const StyledRuxIcon = styled(RuxIcon)`
  color:rgb(31, 39, 50);  
  &:hover {
    transform:scale(1.3);
  }
}
`;

const RecipeDetails: React.FC = () => {
  const location = useLocation();
  const { recipe } = location.state as { recipe: Recipe };
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <SideBar />
      <MainContainer>
        <OuterContainer>
          <div slot="header">{recipe.title}</div>
          <ContentContainer>
            <RecipeImage src={recipe.image} alt="Food" />
            <DescriptionContainer>
              <p>{recipe.description}</p>
            </DescriptionContainer>
            <StyleButton onClick={() => setExpanded(!expanded)}>
            <StyledRuxIcon icon={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}/>
          </StyleButton>
          </ContentContainer>
          
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

1. Sift the dry ingredients togeth Scratch
It's not hard to make homemade pancakes — you just need a good recipe. That's where we come in! You'll find the step-by-step recipe below, but here's a brief overview of what you can expect:

1. Sift the dry ingredients togeth Scratch
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
        </OuterContainer>
      </MainContainer>
    </>
  );
};

export default RecipeDetails;