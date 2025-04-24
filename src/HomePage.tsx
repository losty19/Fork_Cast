import React, { useEffect } from "react";
import './HomePage.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
const client = generateClient<Schema>()

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]);

  const createUserProfile = async (user: any) => {
    try {
      // Extract user details from Cognito
      const userId = user.userId; // Cognito user ID
      const email = user.signInDetails?.loginId;
      const username = email?.split('@')[0];

      if (!userId) {
        console.error('No userId found for user:', user);
        return;
      }

      // Check if UserProfile exists
      const { data: profiles, errors } = await client.models.UserProfile.list({
        filter: { userId: { eq: userId } },
      });

      if (errors) {
        console.error('Error fetching UserProfile:', errors);
        return;
      }

      if (profiles.length > 0) {
        console.log('UserProfile already exists for userId:', userId);
        return;
      }

      // Create new UserProfile
      const { data: newProfile, errors: createErrors } = await client.models.UserProfile.create({
        userId,
        username: username || 'Guest',
        email,
        dietaryPreferences: '', // Default empty string
        likedFoods: '',
        allergies: '',
        dislikedFoods: '',
        diet: '',
        intolerances: '',
      });

      if (createErrors) {
        console.error('Error creating UserProfile:', createErrors);
        return;
      }

      console.log('UserProfile created successfully:', newProfile);
    } catch (error) {
      console.error('Error in createUserProfile:', error);
    }
  };

  useEffect(() => {
    if (user) {
      createUserProfile(user);
    }
  }, [user]);
  return (
    <div className="container">
      <h1 className="Title">ForkCast</h1>
      <Authenticator>
        {({ signOut, user: authUser }) => {
          return (
            <div className="button-container">
              {authUser ? (
                <>
                  <b>Welcome, {authUser.signInDetails?.loginId?.split('@')[0] ?? 'Guest'} </b>
                  <RuxButton className="astro-button" onClick={() => navigate('/main')}>
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
          );
        }}
      </Authenticator>
    </div>
  );
  /*
  return (
    <div className="container">
      <h1 className="Title">ForkCast</h1>
      <Authenticator>
        {({ signOut, user }) => (
          <div className="button-container">
            {user ? (
              <>
                <b>Welcome, {user.signInDetails?.loginId?.split('@')[0] ?? 'Guest'} </b>
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
  );*/
};
export default HomePage;