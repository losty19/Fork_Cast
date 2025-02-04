import React from "react";
import './HomePage.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton } from "@astrouxds/react";

const ForkCast: React.FC = () => {
    return (
      <div className="container">
        <h1>ForkCast</h1>
        <div className="button-container">
          <RuxButton class="astro-button" secondary>Sign In</RuxButton>
          <RuxButton class="astro-button">Sign Up</RuxButton>
        </div>
      </div>
    );
  };


export default ForkCast;