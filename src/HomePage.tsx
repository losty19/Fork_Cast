import React from "react";
import './HomePage.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton} from "@astrouxds/react";
import { useNavigate } from "react-router-dom";


const ForkCast: React.FC = () => {
  const navigate = useNavigate();

    return (
      <div className="container">
        <h1 className="Title">ForkCast</h1>
        <div className="button-container">
          <RuxButton class="astro-button" onClick={() => navigate("/signin")}>Sign In</RuxButton>
          <RuxButton class="astro-button" onClick={() => navigate("/main")}>Sign Up</RuxButton>
        </div>
      </div>
    );
  };


export default ForkCast;