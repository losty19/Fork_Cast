import React, { useEffect } from "react";
import Select from 'react-select';
import { useState } from 'react';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton, RuxContainer } from "@astrouxds/react";
import SideBar from "./SideBar";
import './Profile.css';
import CreatableSelect from 'react-select/creatable';
import { commonIngredients } from './data/ingredients';


interface OptionType {
  value: string;
  label: string;
}

const Profile: React.FC = () => {
  const [selectedIntolerances, setSelectedIntolerances] = useState<OptionType[]>([]);
  const handleIntolerancesChange = (newValue: any, actionMeta: any) => {
    if (actionMeta.action === 'create-option') {
      setSelectedIntolerances((prev) => [...prev, ...newValue]);
    } else {
      setSelectedIntolerances(newValue);
    }
  };

  const [likedFoods, setLikedFoods] = useState<OptionType[]>([]);
  const handleLikedFoodsChange = (newValue: any, actionMeta: any) => {
    if (actionMeta.action === 'create-option') {
      setLikedFoods((prev) => [...prev, ...newValue]);
    } else {
      setLikedFoods(newValue);
    }
  };

  const [dislikedFoods, setDislikedFoods] = useState<OptionType[]>([]);
  const handleDislikedFoodsChange = (newValue: any, actionMeta: any) => {
    if (actionMeta.action === 'create-option') {
      setDislikedFoods((prev) => [...prev, ...newValue]);
    } else {
      setDislikedFoods(newValue);
    }
  };

  const [selectedDiet, setSelectedDiet] = useState<OptionType[]>([]);
  const handleDietChange = (newValue: any, actionMeta: any) => {
    if (actionMeta.action === 'create-option') {
      setSelectedDiet((prev) => [...prev, ...newValue]);
    } else {
      setSelectedDiet(newValue);
    }
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

  const dietOptions = [
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

  const exportIntolerances = (): string => {
    return selectedIntolerances.map(option => option.label).join(',');
  };

  const exportLikedFoods = (): string => {
    return likedFoods.map(option => option.label).join(',');
  };

  const exportDislikedFoods = (): string => {
    return dislikedFoods.map(option => option.label).join(',');
  };

  useEffect(() => {
    const savedIntolerances = localStorage.getItem('selectedIntolerances');
    const savedLikedFoods = localStorage.getItem('likedFoods');
    const savedDislikedFoods = localStorage.getItem('dislikedFoods');
    const savedDiet = localStorage.getItem('selectedDiet');
    if (savedIntolerances) setSelectedIntolerances(JSON.parse(savedIntolerances));
    if (savedLikedFoods) setLikedFoods(JSON.parse(savedLikedFoods));
    if (savedDislikedFoods) setDislikedFoods(JSON.parse(savedDislikedFoods));
    if (savedDiet) setSelectedDiet(JSON.parse(savedDiet));
  }, []);

  const handleSubmit = () => {
    localStorage.setItem('selectedIntolerances', JSON.stringify(selectedIntolerances));
    localStorage.setItem('likedFoods', JSON.stringify(likedFoods));
    localStorage.setItem('dislikedFoods', JSON.stringify(dislikedFoods));
    localStorage.setItem('selectedDiet', JSON.stringify(selectedDiet));
    console.log(`&likedfoods=${exportLikedFoods().toLowerCase()}`);
    console.log(`&dislikedfoods=${exportDislikedFoods().toLowerCase()}`);
    console.log(`&intolerances=${exportIntolerances().toLowerCase()}`);
    console.log(`&diet=${selectedDiet.map(option => option.label.toLowerCase()).join(',')}`);
    const submitVar = `&likedfoods=${exportLikedFoods().toLowerCase()}&dislikedfoods=${exportDislikedFoods().toLowerCase()}&intolerances=${exportIntolerances().toLowerCase()}&diet=${selectedDiet.map(option => option.label.toLowerCase()).join(',')}`;
    console.log(submitVar);
  }

  return (
    <>
    <SideBar />
    <div>
        <RuxContainer className="profile-container light-theme">
          <div slot="header">Profile</div>
          <div slot="footer">
            <RuxButton onClick={handleSubmit}>Save</RuxButton>
          </div>
          <div className="profile-content">
            <div slot="label" >Liked Foods</div>
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
      </div>
    </>
  );
};

export default Profile;