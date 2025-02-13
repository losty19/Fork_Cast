import React from "react";
import { useState } from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxIcon, RuxContainer, RuxInput, RuxButton, RuxDialog } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile: React.FC = () => {
  // Here I am making a profile page for the user to view their profile, and change their preferences
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

export default Profile;