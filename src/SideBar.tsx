import React from "react";
// import { useState } from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
// import { Authenticator } from '@aws-amplify/ui-react';
import { RuxIcon } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";


const SideBar = () => {
    const navigate = useNavigate();

    return (
    <div className="main-container">
          <div className="sidebar">
            <button className="icon-button" onClick={() => navigate("/profile")}>
              <RuxIcon size="small" icon="account-circle"></RuxIcon>
            </button>
            <button className="icon-button" onClick={() => navigate("/main")}>
              <RuxIcon size="small" icon="home"></RuxIcon>
            </button>
            <button className="icon-button">
              <RuxIcon size="small" icon="local-grocery-store"></RuxIcon>
            </button>
            <button className="icon-button">
              <RuxIcon size="small" icon="settings"></RuxIcon>
            </button>
          </div>
          <div className="content">
          </div>
        </div>
    )
  }
export default SideBar;  