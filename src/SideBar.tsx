// import React from "react"; // Wasn't being used so I commented it out for 'npm run build'
// import { useState } from "react"; // Wasn't being used so I commented it out for 'npm run build'
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
// import { Authenticator } from '@aws-amplify/ui-react';
// import { RuxIcon, RuxInput, RuxButton, RuxDialog } from "@astrouxds/react"; // Wasn't being used so I commented it out for 'npm run build'
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { useState } from "react";
import { RuxIcon, RuxDialog, RuxInput, RuxButton} from "@astrouxds/react";
import { useNavigate } from "react-router-dom";

interface RuxInputEvent extends Event {
  target: HTMLInputElement;
}

const SideBar = () => {
    const [isMealRequestOpen, setIsMealRequestOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const navigate = useNavigate();

    const buttonPressed = () => {
      setIsMealRequestOpen(!isMealRequestOpen);
    }

    const handleInputChange = (e: RuxInputEvent) => {
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
        <button onClick={() => navigate("/main")}>
            <div className="logo-text">ForkCast</div>
              </button>
    <div className="main-container">
          <div className="sidebar">
            <button className="icon-button" onClick={buttonPressed}>
              <RuxIcon className="icon-image" size="35px" icon="add-circle-outline"></RuxIcon>
            </button>
            <button className="icon-button" onClick={() => navigate("/grocery-list")}>
              <RuxIcon className="icon-image" size="small" icon="local-grocery-store"></RuxIcon>
            </button>
            <button className="icon-button" onClick={() => navigate("/profile")}>
              <RuxIcon className="icon-image" size="small" icon="account-circle"></RuxIcon>
            </button>
            <button className="icon-button">
              <RuxIcon className="icon-image"size="small" icon="settings"></RuxIcon>
            </button>
          </div>
          <div className="content">
          </div>
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
                  <RuxInput class="MRInput" type="text" value={inputValue} onRuxchange={(e) => handleInputChange(e as unknown as RuxInputEvent)}/>
                  <div className="dialog-buttons">
                    <RuxButton className="mrCancel" onClick={handleDialogClose}>Cancel</RuxButton>
                    <RuxButton className="mrSubmit" onClick={handleSubmit}>Submit</RuxButton>
                  </div>
                </RuxDialog>
              )}
              </>
    );
  }
export default SideBar;  