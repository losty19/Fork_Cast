import React from "react";
import './HomePage.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';

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
      <Authenticator
        // Customize the sign-in/sign-up UI if needed
        components={{
          SignIn: (props) => (
            <Authenticator.SignIn {...props}>
              <div className="button-container">
                <h2>Sign In</h2>
                {props.children}
                {/* Optionally add custom buttons or styling */}
              </div>
            </Authenticator.SignIn>
          ),
          SignUp: (props) => (
            <Authenticator.SignUp {...props}>
              <div className="button-container">
                <h2>Sign Up</h2>
                {props.children}
              </div>
            </Authenticator.SignUp>
          ),
        }}
      >
        {({ signOut, user }) => (
          <div className="button-container">
            {user ? (
              <>
                <p>Welcome, {user.username}!</p>
                <RuxButton className="astro-button" onClick={() => navigate("/main")}>
                  Go to Main Page
                </RuxButton>
                <RuxButton className="astro-button" onClick={signOut}>
                  Sign Out
                </RuxButton>
              </>
            ) : (
              <p>Please sign in or sign up above</p>
            )}
          </div>
        )}
      </Authenticator>
    </div>
  );
};

export default HomePage;