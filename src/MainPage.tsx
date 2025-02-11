import React from "react";
import { useState } from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxTabs, RuxTab } from "@astrouxds/react";
import './MainPage.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { RuxIcon, RuxContainer, RuxInput, RuxButton } from "@astrouxds/react";


const MainPage: React.FC = () => {
  const [isMealRequestOpen, setIsMealRequestOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const buttonPressed = () => {
    setIsMealRequestOpen(!isMealRequestOpen);
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    console.log(inputValue);
  }

  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <button className="icon-button">
            <RuxIcon size="normal" icon="local-grocery-store"></RuxIcon>
          </button>
          <button className="icon-button">
            <img src="icon2.png" alt="Icon 2" className="icon-image" />
          </button>
          <button className="icon-button">
            <img src="icon3.png" alt="Icon 3" className="icon-image" />
          </button>
        </div>
        <div className="content">
        </div>
      </div>
      <div className="meal-request">
        <button className="icon-button" onClick={() => buttonPressed()}>
          <RuxIcon size="normal" icon="add-circle"></RuxIcon>
        </button>
      </div>

      {isMealRequestOpen && (
        <RuxContainer className="meal-request-container">
          <RuxInput label="Meal Request" type="text" value={inputValue} onRuxchange={(e: any) => handleInputChange(e)}/>
          <RuxButton className="mrSubmit" onClick={handleSubmit}>Submit</RuxButton>
        </RuxContainer>
      )}
    </>
  );
}

export default MainPage;
