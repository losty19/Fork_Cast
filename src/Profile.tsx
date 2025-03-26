import React, { useEffect } from "react";
import Select, { OptionTypeBase } from 'react-select';
import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton, RuxContainer, RuxInput } from "@astrouxds/react";
import SideBar from "./SideBar";
import './Profile.css';
import CreatableSelect from 'react-select/creatable';
import { commonIngredients } from './data/ingredients'; // Import commonIngredients

interface RuxInputEvent extends Event {
  target: HTMLInputElement;
}

interface OptionType extends OptionTypeBase {
  value: string;
  label: string;
}

const Profile: React.FC = () => {
  const [inputValueLike, setInputValueLike] = useState<string>('');
  const handleInputChangeLike = (e: RuxInputEvent) => {
    setInputValueLike(e.target.value);
  }
  const [inputValueDislike, setInputValueDislike] = useState<string>('');
  const handleInputChangeDislike = (e: RuxInputEvent) => {
    setInputValueDislike(e.target.value);
  }
  const [selectedPrefCuisines, setSelectedPrefCuisines] = useState<OptionType[]>([]);
  const [selectedExcludeCuisines, setSelectedExcludeCuisines] = useState<OptionType[]>([]);
  const handlePrefCuisinesChange = (selectedOptions: OptionType[]) => {
    setSelectedPrefCuisines(selectedOptions);
  };
  const handleExcludeCuisinesChange = (selectedOptions: OptionType[]) => {
    setSelectedExcludeCuisines(selectedOptions);
  };
  const [selectedIntolerances, setSelectedIntolerances] = useState<OptionType[]>([]);
  const handleIntolerancesChange = (selectedOptions: OptionType[]) => {
    setSelectedIntolerances(selectedOptions);
  };

  const [likedFoods, setLikedFoods] = useState<OptionType[]>([]);
  const handleLikedFoodsChange = (selectedOptions: OptionType[]) => {
    setLikedFoods(selectedOptions);
  };

  const [dislikedFoods, setDislikedFoods] = useState<OptionType[]>([]);
  const handleDislikedFoodsChange = (selectedOptions: OptionType[]) => {
    setDislikedFoods(selectedOptions);
  };

  const intolerances = [
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

  const cuisineOptions = [
    { value: 'african', label: 'African' },
    { value: 'asian', label: 'Asian' },
    { value: 'american', label: 'American' },
    { value: 'british', label: 'British' },
    { value: 'cajun', label: 'Cajun' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'easternEuropean', label: 'Eastern European' },
    { value: 'european', label: 'European' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'greek', label: 'Greek' },
    { value: 'indian', label: 'Indian' },
    { value: 'irish', label: 'Irish' },
    { value: 'italian', label: 'Italian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'jewish', label: 'Jewish' },
    { value: 'korean', label: 'Korean' },
    { value: 'latinAmerican', label: 'Latin American' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'middleEastern', label: 'Middle Eastern' },
    { value: 'nordic', label: 'Nordic' },
    { value: 'southern', label: 'Southern' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'thai', label: 'Thai' },
    { value: 'vietnamese', label: 'Vietnamese' }
  ];

  const ingredientOptions = Object.keys(commonIngredients).map(ingredient => ({
    value: ingredient,
    label: ingredient,
  }));

  const exportPrefCuisines = (): string => {
    return selectedPrefCuisines.map(option => option.label).join(', ');
  };

  const exportExcludeCuisines = (): string => {
    return selectedExcludeCuisines.map(option => option.label).join(', ');
  };
  const exportIntolerances = (): string => {
    return selectedIntolerances.map(option => option.label).join(', ');
  };

  const exportLikedFoods = (): string => {
    return likedFoods.map(option => option.label).join(', ');
  };

  const exportDislikedFoods = (): string => {
    return dislikedFoods.map(option => option.label).join(', ');
  };

  useEffect(() => {
    const savedPrefCuisines = localStorage.getItem('selectedPrefCuisines');
    const savedExcludeCuisines = localStorage.getItem('selectedExcludeCuisines');
    const savedIntolerances = localStorage.getItem('selectedIntolerances');
    const savedLikedFoods = localStorage.getItem('likedFoods');
    const savedDislikedFoods = localStorage.getItem('dislikedFoods');
    if (savedPrefCuisines) setSelectedPrefCuisines(JSON.parse(savedPrefCuisines));
    if (savedExcludeCuisines) setSelectedExcludeCuisines(JSON.parse(savedExcludeCuisines));
    if (savedIntolerances) setSelectedIntolerances(JSON.parse(savedIntolerances));
    if (savedLikedFoods) setLikedFoods(JSON.parse(savedLikedFoods));
    if (savedDislikedFoods) setDislikedFoods(JSON.parse(savedDislikedFoods));
  }, []);

  const handleSubmit = () => {
    localStorage.setItem('selectedPrefCuisines', JSON.stringify(selectedPrefCuisines));
    localStorage.setItem('selectedExcludeCuisines', JSON.stringify(selectedExcludeCuisines));
    localStorage.setItem('selectedIntolerances', JSON.stringify(selectedIntolerances));
    localStorage.setItem('likedFoods', JSON.stringify(likedFoods));
    localStorage.setItem('dislikedFoods', JSON.stringify(dislikedFoods));
    console.log(exportLikedFoods());
    console.log(exportDislikedFoods());
    console.log(exportPrefCuisines());
    console.log(exportExcludeCuisines());
    console.log(exportIntolerances());
  }

  return (
    <>
    <SideBar />
    <div className="profile-container">
        <RuxContainer>
          <div slot="header">Profile</div>
          <div slot="footer">
            <RuxButton onClick={handleSubmit}>Save</RuxButton>
          </div>
          <div className="profile-content">
            <div slot="label" >Liked Foods</div>
            <CreatableSelect
            isClearable
            isMulti
            options={ingredientOptions} // Use ingredientOptions for likedFoods
            value={likedFoods}
            onChange={handleLikedFoodsChange}
             />
            <div slot="label">Disliked Foods</div>
            <CreatableSelect
              isClearable
              isMulti
              options={ingredientOptions} // Use ingredientOptions for dislikedFoods
              value={dislikedFoods}
              onChange={handleDislikedFoodsChange}
            />
            <div slot="label">Preferred Cuisines</div>
            <Select
              options={cuisineOptions}
              isMulti
              value={selectedPrefCuisines}
              onChange={handlePrefCuisinesChange}
            />
            <div slot="label">Cuisines to Exclude</div>

            <Select
              options={cuisineOptions}
              isMulti
              value={selectedExcludeCuisines}
              onChange={handleExcludeCuisinesChange}
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
      </div>
    </>
  );
};

export default Profile;