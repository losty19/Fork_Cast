import React from "react";
import './HomePage.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // return (
  //   <div className="container">
  //     <h1 className="Title">ForkCast</h1>
  //     <div className="button-container">
  //       <RuxButton className="astro-button" onClick={() => navigate("/main")}>Sign In</RuxButton>
  //       <RuxButton className="astro-button" onClick={() => navigate("/signup")}>Sign Up</RuxButton>
  //     </div>
  //   </div>
  // );
  return (
    <div className="container">
      <h1 className="Title">ForkCast</h1>
      <Authenticator>
        {({ signOut, user }) => (
          <div className="button-container">
            {user ? (
              <>
                <p>Welcome, {user.username}!</p>
                <p>Your userId is: {user.userId}</p>
                <RuxButton className="astro-button" onClick={() => navigate("/main")}>
                  Go to Main Page
                </RuxButton>
                <RuxButton className="astro-button" onClick={signOut}>
                  Sign Out
                </RuxButton>
              </>
            ) : (
              <p>Please sign in or sign up using the form above</p>
            )}
          </div>
        )}
      </Authenticator>
    </div>
  );
};

export default HomePage;