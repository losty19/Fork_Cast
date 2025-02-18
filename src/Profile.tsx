import React from "react";
// import { useNavigate } from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxDialog, RuxButton, RuxContainer, RuxInput } from "@astrouxds/react";
import './Profile.css';

const Profile: React.FC = () => {
  console.log("Profile page");
  
  return (
    <div>
      <RuxContainer className="profile-container">
        <div slot="header">Profile</div>
        <div slot="footer">
          <RuxButton>Save</RuxButton>
        </div>
        <div className="profile-content">
          <RuxInput></RuxInput>          
        </div>
      </RuxContainer>
    </div>
  );
};

export default Profile;