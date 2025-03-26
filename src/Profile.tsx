import React, { useEffect } from "react";
import Select, { OptionTypeBase } from 'react-select';
import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton, RuxContainer, RuxInput } from "@astrouxds/react";
import SideBar from "./SideBar";
import './Profile.css';
import CreatableSelect from 'react-select/creatable';

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

  // const customStyles = {
  //   control: (provided) => ({
  //     ...provided,
  //     backgroundColor: '#e27e36',
  //     border: 'none',
  //     boxShadow: '0 20px 20px rgba(0, 0, 0, 0.418)',
  //     padding: '5px',
  //     margin: '10px 0',
  //   }),
  //   option: (provided, state) => ({
  //     ...provided,
  //     backgroundColor: state.isSelected ? '#a5561e' : '#e27e36',
  //     color: state.isSelected ? '#fff' : '#000',
  //     padding: '10px',
  //   }),
  //   multiValue: (provided) => ({
  //     ...provided,
  //     backgroundColor: '#a5561e',
  //     color: '#fff',
  //   }),
  //   multiValueLabel: (provided) => ({
  //     ...provided,
  //     color: '#fff',
  //   }),
  //   multiValueRemove: (provided) => ({
  //     ...provided,
  //     color: '#fff',
  //     ':hover': {
  //       backgroundColor: '#e27e36',
  //       color: '#000',
  //     },
  //   }),
  // };

  const exportPrefCuisines = (): string => {
    return selectedPrefCuisines.map(option => option.label).join(', ');
  };

  const exportExcludeCuisines = (): string => {
    return selectedExcludeCuisines.map(option => option.label).join(', ');
  };
  const exportIntolerances = (): string => {
    return selectedIntolerances.map(option => option.label).join(', ');
  };

  useEffect(() => {
    const savedLike = localStorage.getItem('inputValueLike');
    const savedDislike = localStorage.getItem('inputValueDislike');
    const savedPrefCuisines = localStorage.getItem('selectedPrefCuisines');
    const savedExcludeCuisines = localStorage.getItem('selectedExcludeCuisines');
    const savedIntolerances = localStorage.getItem('selectedIntolerances');
    if (savedLike) setInputValueLike(savedLike);
    if (savedDislike) setInputValueDislike(savedDislike);
    if (savedPrefCuisines) setSelectedPrefCuisines(JSON.parse(savedPrefCuisines));
    if (savedExcludeCuisines) setSelectedExcludeCuisines(JSON.parse(savedExcludeCuisines));
    if (savedIntolerances) setSelectedIntolerances(JSON.parse(savedIntolerances));
  }, []);

  const handleSubmit = () => {
    localStorage.setItem('inputValueLike', inputValueLike);
    localStorage.setItem('inputValueDislike', inputValueDislike);
    localStorage.setItem('selectedPrefCuisines', JSON.stringify(selectedPrefCuisines));
    localStorage.setItem('selectedExcludeCuisines', JSON.stringify(selectedExcludeCuisines));
    localStorage.setItem('selectedIntolerances', JSON.stringify(selectedIntolerances));
    console.log(inputValueLike);
    console.log(inputValueDislike);
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
            <RuxInput value={inputValueLike} onRuxchange={(e) => handleInputChangeLike(e as unknown as RuxInputEvent)}>
              <div slot="label" >Liked Foods</div>
            </RuxInput>
            <CreatableSelect
            isClearable
            isMulti
             />;
            <RuxInput value={inputValueDislike} onRuxchange={(e) => handleInputChangeDislike(e as unknown as RuxInputEvent)}>
              <div slot="label">Disliked Foods</div>
            </RuxInput>
            <div slot="label">Preferred Cuisines</div>
            <Select
              options={cuisineOptions}
              isMulti
              value={selectedPrefCuisines}
              onChange={handlePrefCuisinesChange}
              // styles={customStyles}
            />
            <div slot="label">Cuisines to Exclude</div>

            <Select
              options={cuisineOptions}
              isMulti
              value={selectedExcludeCuisines}
              onChange={handleExcludeCuisinesChange}
              // styles={customStyles}
            />
            <div slot="label">Intolerances</div>
            <Select
              options={intolerances}
              isMulti
              value={selectedIntolerances}
              onChange={handleIntolerancesChange}
              // styles={customStyles}
            />
          </div>
        </RuxContainer>
      </div>
    </>
  );
};

export default Profile;