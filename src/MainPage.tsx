import React from "react";
import { useState } from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import SideBar from "./SideBar";
// import { Authenticator } from '@aws-amplify/ui-react';
import { RuxIcon, RuxInput, RuxButton, RuxDialog } from "@astrouxds/react";
// import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [isMealRequestOpen, setIsMealRequestOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // const navigate = useNavigate();

  const buttonPressed = () => {
    setIsMealRequestOpen(!isMealRequestOpen);
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    console.log(inputValue);
    setIsMealRequestOpen(false); 
  }

  const handleDialogClose = () => {
    setIsMealRequestOpen(false);
  }

  return (
    <>
      <SideBar />
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
          <RuxInput class="MRInput" type="text" value={inputValue} onRuxchange={(e: any) => handleInputChange(e)}/>
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


