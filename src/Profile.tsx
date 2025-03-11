import React from "react";
import { useState } from 'react';
import styled from "styled-components";

// import { useNavigate } from "react-router-dom";
//import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton, RuxContainer, RuxInput } from "@astrouxds/react";
import SideBar from "./SideBar";
import './index.css';

interface RuxInputEvent extends Event {
  target: HTMLInputElement;
}



const Profile: React.FC = () => {
  // console.log("Profile page");
  const [inputValueLike, setInputValueLike] = useState('');
  const handleInputChangeLike = (e: RuxInputEvent) => {
    setInputValueLike(e.target.value);
  }
  const [inputValueDislike, setInputValueDislike] = useState('');
  const handleInputChangeDislike = (e: RuxInputEvent) => {
    setInputValueDislike(e.target.value);
  }
  const handleSubmit = () => {
    console.log(inputValueLike);
    console.log(inputValueDislike);
  }

  return (
    <>
    <SideBar />
    <div className="profile-outer-box" style={{ backgroundColor: "#E27545", color: "white" }}>
      <RuxContainer className="profile-container hydrated" style={{ backgroundColor: "orange", color: "white" }}>
      <div slot="header">Profile</div>
      <div slot="footer">
        <RuxButton onClick={handleSubmit} style={{ backgroundColor: "orange", color: "white" }}>Save</RuxButton>
      </div>
      <div className="profile-content">
        <RuxInput onRuxchange={(e) => handleInputChangeLike(e as unknown as RuxInputEvent)} style={{ color: "white" }}>
        <div slot="label">Liked Foods</div>
        </RuxInput>
        <RuxInput onRuxchange={(e) => handleInputChangeDislike(e as unknown as RuxInputEvent)} style={{ color: "white" }}>
        <div slot="label">Disliked Foods</div>
        </RuxInput>
      </div>
      </RuxContainer>
    </div>
    </>
  );
};

export default Profile;