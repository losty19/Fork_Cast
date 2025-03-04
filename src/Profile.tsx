import React from "react";
import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton, RuxContainer, RuxInput } from "@astrouxds/react";
import SideBar from "./SideBar";


const Profile: React.FC = () => {
  // console.log("Profile page");
  const [inputValueLike, setInputValueLike] = useState('');
  const handleInputChangeLike = (e: any) => {
    setInputValueLike(e.target.value);
  }
  const [inputValueDislike, setInputValueDislike] = useState('');
  const handleInputChangeDislike = (e: any) => {
    setInputValueDislike(e.target.value);
  }
  const handleSubmit = () => {
    console.log(inputValueLike);
    console.log(inputValueDislike);
  }

  return (
    <>
    <SideBar />
    <div>
      <RuxContainer className="profile-container">
        <div slot="header">Profile</div>
        <div slot="footer">
          <RuxButton onClick={handleSubmit}>Save</RuxButton>
        </div>
        <div className="profile-content">
          <RuxInput onRuxchange={(e: any) => handleInputChangeLike(e)}>
            <div slot="label" >Liked Foods</div>
          </RuxInput>
          <RuxInput onRuxchange={(e: any) => handleInputChangeDislike(e)}>
            <div slot="label">Disliked Foods</div>
          </RuxInput>
        </div>
      </RuxContainer>
    </div>
    </>
  );
};

export default Profile;