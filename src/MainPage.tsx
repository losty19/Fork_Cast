import React from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxTabs, RuxTab } from "@astrouxds/react";
import './MainPage.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { RuxIcon } from "@astrouxds/react";


const MainPage: React.FC = () => {

  return (
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
  );
}

export default MainPage;
