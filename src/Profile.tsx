import React, { useEffect, useState } from "react";
import Select, { MultiValue } from 'react-select';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton, RuxContainer, RuxToast } from "@astrouxds/react";
import SideBar from "./SideBar";
import './Profile.css';
import CreatableSelect from 'react-select/creatable';
import { commonIngredients } from './data/ingredients';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>();

interface OptionType {
  value: string;
  label: string;
}

const Profile: React.FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [selectedIntolerances, setSelectedIntolerances] = useState<OptionType[]>([]);
  const [likedFoods, setLikedFoods] = useState<OptionType[]>([]);
  const [dislikedFoods, setDislikedFoods] = useState<OptionType[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<OptionType[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const intolerances: ReadonlyArray<OptionType> = [
    { value: 'dairy', label: 'Dairy' },
    { value: 'egg', label: 'Egg' },
    { value: 'gluten', label: 'Gluten' },
    { value: 'grain', label: 'Grain' },
    { value: 'peanut', label: 'Peanut' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'sesame', label: 'Sesame' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'soy', label: 'Soy' },
    { value: 'sulfite', label: 'Sulfite' },
    { value: 'treeNut', label: 'Tree Nut' },
    { value: 'wheat', label: 'Wheat' }
  ];

  const dietOptions: ReadonlyArray<OptionType> = [
    { value: 'glutenFree', label: 'Gluten Free' },
    { value: 'ketogenic', label: 'Ketogenic' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'lactoVegetarian', label: 'Lacto-Vegetarian' },
    { value: 'ovoVegetarian', label: 'Ovo-Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'pescetarian', label: 'Pescetarian' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'primal', label: 'Primal' },
    { value: 'lowFODMAP', label: 'Low FODMAP' },
    { value: 'whole30', label: 'Whole30' }
  ];

  const ingredientOptions = Object.keys(commonIngredients).map(ingredient => ({
    value: ingredient,
    label: ingredient,
  }));

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      try {
        const userId = (await getCurrentUser()).userId;
        const { data: profiles, errors } = await client.models.UserProfile.list({
          filter: { userId: { eq: userId } },
        });

        if (errors) {
          console.error('Error fetching UserProfile:', errors);
          setToastMessage('Failed to load profile data.');
          return;
        }

        if (profiles.length > 0) {
          const profile = profiles[0];
          // Convert comma-separated strings to OptionType arrays
          setLikedFoods(
            profile.likedFoods
              ?.split(',')
              .filter(Boolean)
              .map(item => ({ value: item.toLowerCase(), label: item })) ?? []
          );
          setDislikedFoods(
            profile.dislikedFoods
              ?.split(',')
              .filter(Boolean)
              .map(item => ({ value: item.toLowerCase(), label: item })) ?? []
          );
          setSelectedIntolerances(
            profile.intolerances
              ?.split(',')
              .filter(Boolean)
              .map(item => ({ value: item.toLowerCase(), label: item })) ?? []
          );
          setSelectedDiet(
            profile.diet
              ?.split(',')
              .filter(Boolean)
              .map(item => ({ value: item.toLowerCase(), label: item })) ?? []
          );
        }
      } catch (error) {
        console.error('Error fetching UserProfile:', error);
        setToastMessage('Failed to load profile data.');
      }
    };
    fetchUserProfile();
  }, [user]);

  // Simplified change handlers
  const handleIntolerancesChange = (newValue: MultiValue<OptionType>) => {
    setSelectedIntolerances(newValue as OptionType[]);
  };

  const handleLikedFoodsChange = (newValue: MultiValue<OptionType>) => {
    setLikedFoods(newValue as OptionType[]);
  };

  const handleDislikedFoodsChange = (newValue: MultiValue<OptionType>) => {
      setDislikedFoods(newValue as OptionType[]);
  };

  const handleDietChange = (newValue: MultiValue<OptionType>) => {
    setSelectedDiet(newValue as OptionType[]);
  };

  const handleSubmit = async () => {
    if (!user) {
      setToastMessage('Please sign in to save your profile.');
      return;
    }

    try {
      const userId = (await getCurrentUser()).userId;
      const profileData = {
        likedFoods: likedFoods.map(option => option.label).join(','),
        dislikedFoods: dislikedFoods.map(option => option.label).join(','),
        intolerances: selectedIntolerances.map(option => option.label).join(','),
        diet: selectedDiet.map(option => option.label).join(','),
      };

      // Check if UserProfile exists
      const { data: profiles, errors } = await client.models.UserProfile.list({
        filter: { userId: { eq: userId } },
      });

      if (errors) {
        console.error('Error fetching UserProfile:', errors);
        setToastMessage('Failed to save profile.');
        return;
      }

      if (profiles.length > 0) {
        // Update existing UserProfile
        const profile = profiles[0];
        const { errors: updateErrors, data: updatedUser } = await client.models.UserProfile.update({
          id: profile.id,
          ...profileData,
        });

        if (updateErrors) {
          console.error('Error updating UserProfile:', updateErrors);
          setToastMessage('Failed to save profile.');
        } else {
          console.log('UserProfile updated successfully:', updatedUser);
          setToastMessage('Profile saved successfully!');
        }
      } else {
        // Create new UserProfile
        const { errors: createErrors, data: newUser } = await client.models.UserProfile.create({
          userId,
          username: user.signInDetails?.loginId?.split('@')[0] ?? 'Guest',
          email: user.signInDetails?.loginId ?? '',
          ...profileData,
        });

        if (createErrors) {
          console.error('Error creating UserProfile:', createErrors);
          setToastMessage('Failed to save profile.');
        } else {
          console.log('UserProfile created successfully:', newUser);
          setToastMessage('Profile saved successfully!');
        }
      }
    } catch (error) {
      console.error('Error saving UserProfile:', error);
      setToastMessage('Failed to save profile.');
    }
  };

  return (
    <div className="main-container">
      <SideBar />
        <RuxContainer className="profile-container light-theme">
          <div slot="header">Profile</div>
          <div slot="footer">
            <RuxButton onClick={handleSubmit}>Save</RuxButton>
          </div>
          <div className="profile-content">
            <div slot="label">Liked Foods</div>
            <CreatableSelect
              isClearable
              isMulti
              options={ingredientOptions}
              value={likedFoods}
              onChange={handleLikedFoodsChange}
            />
            <div slot="label">Disliked Foods</div>
            <CreatableSelect
              isClearable
              isMulti
              options={ingredientOptions}
              value={dislikedFoods}
              onChange={handleDislikedFoodsChange}
            />
            <div slot="label">Diet</div>
            <Select
              options={dietOptions}
              isMulti
              value={selectedDiet}
              onChange={handleDietChange}
            />
            <div slot="label">Intolerances</div>
            <Select
              options={intolerances}
              isMulti
              value={selectedIntolerances}
              onChange={handleIntolerancesChange}
            />
          </div>
        </RuxContainer>
        {toastMessage && (
          <RuxToast
            message={toastMessage}
            closeAfter={3000}
          />
        )}
    </div>
  );
};

export default Profile;