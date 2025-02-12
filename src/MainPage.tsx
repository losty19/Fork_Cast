import React from "react";
import { useState } from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { RuxIcon, RuxContainer, RuxInput, RuxButton, RuxDialog } from "@astrouxds/react";


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
    setIsMealRequestOpen(false); // Close the dialog after submission
  }

  const handleDialogClose = () => {
    setIsMealRequestOpen(false);
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
        <button className="icon-button" onClick={buttonPressed}>
          <RuxIcon size="normal" icon="add-circle"></RuxIcon>
        </button>
      </div>

      {isMealRequestOpen && (
        <RuxDialog 
          className="meal-request-container" 
          open={isMealRequestOpen} 
          header="Meal Request" 
          message="Content goes here" 
          confirmText=""
          denyText=""
          onRuxdialogclosed={handleDialogClose}
        >
          <RuxInput class="MRInput" /*label=""*/ type="text" value={inputValue} onRuxchange={(e: any) => handleInputChange(e)}/>
          <div className="dialog-buttons">
            <RuxButton className="mrCancel" onClick={handleDialogClose}>Cancel</RuxButton>
            <RuxButton className="mrSubmit" onClick={handleSubmit}>Submit</RuxButton>
          </div>
        </RuxDialog>
      )}
    </>
  );
}

export default MainPage;