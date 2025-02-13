import React from "react";
import './HomePage.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="Title">ForkCast</h1>
      <div className="button-container">
        <RuxButton className="astro-button" onClick={() => navigate("/main")}>Sign In</RuxButton>
        <RuxButton className="astro-button" onClick={() => navigate("/signup")}>Sign Up</RuxButton>
      </div>
    </div>
  );
};

export default HomePage;