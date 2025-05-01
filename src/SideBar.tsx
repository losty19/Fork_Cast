import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
// import { Authenticator } from '@aws-amplify/ui-react';
import { useState, useRef, useEffect } from "react";
import { RuxIcon, RuxDialog, RuxInput, RuxToast } from "@astrouxds/react";
import { RuxTabs, RuxTab, RuxTabPanels, RuxTabPanel } from '@astrouxds/react';
import { useNavigate } from "react-router-dom";
import { generateClient } from 'aws-amplify/api';
import Select, { MultiValue } from 'react-select';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '../amplify/data/resource';

interface OptionType {
  value: string;
  label: string;
}

const client = generateClient<Schema>();

interface GroceryItem {
  id: number;
  name: string;
  measurement: string;
}


interface GroceryListItemProps {
  item: GroceryItem;
  onEdit: (id: number, name: string, measurement: string) => void;
}

const GroceryListItem: React.FC<GroceryListItemProps> = ({ item, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [newMeasurement, setNewMeasurement] = useState(item.measurement);

  const handleEditToggle = () => {
    if (isEditing) {
      onEdit(item.id, newName, newMeasurement);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="grocery-item">
      {isEditing ? (
        <div className="edit-mode" style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="edit-input"
            style={{ width: "11.25vw", height: "5vh" }}
          />
          <input
            type="text"
            value={newMeasurement}
            onChange={(e) => setNewMeasurement(e.target.value)}
            className="edit-input"
            style={{ width: "11.25vw", height: "5vh" }}
          />
        </div>
      ) : (
        <div className="display-mode">
          <span className="item-name" style={{ color: "black" }}>{item.name}</span>
          <span className="item-measurement" style={{ color: "black" }}>{item.measurement}</span>
        </div>
      )}
      <button onClick={handleEditToggle} className="edit-butn">
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
};

const SideBar = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [isMealRequestOpen, setIsMealRequestOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [newItemName, setNewItemName] = useState('');
  const [newItemMeasurement, setNewItemMeasurement] = useState('');
  const [selectedPrefCuisines, setSelectedPrefCuisines] = useState<OptionType[]>([]);
  const [selectedExcludeCuisines, setSelectedExcludeCuisines] = useState<OptionType[]>([]);
  const [userProfile, setUserProfile] = useState<{
    likedFoods?: string | null;
    dislikedFoods?: string | null;
    diet?: string | null;
    intolerances?: string | null;
  } | null>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const instructionsRef = useRef<HTMLTextAreaElement | null>(null);

  const cuisineOptions: ReadonlyArray<OptionType> = [
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

  const [items, setItems] = useState<GroceryItem[]>([]);

  const navigate = useNavigate();

  // Fetch UserProfile on mount
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
          setToastMessage('Failed to load user preferences.');
          return;
        }

        if (profiles.length > 0) {
          setUserProfile({
            likedFoods: profiles[0].likedFoods,
            dislikedFoods: profiles[0].dislikedFoods,
            diet: profiles[0].diet,
            intolerances: profiles[0].intolerances,
          });
        }
      } catch (error) {
        console.error('Error fetching UserProfile:', error);
        setToastMessage('Failed to load user preferences.');
      }
    };
    fetchUserProfile();
  }, [user]);

  const handlePrefCuisinesChange = (newValue: MultiValue<OptionType>) => {
    setSelectedPrefCuisines(newValue as OptionType[]);
  };

  const handleExcludeCuisinesChange = (newValue: MultiValue<OptionType>) => {
    setSelectedExcludeCuisines(newValue as OptionType[]);
  };

  const handleAddItem = () => {
    if (!newItemName.trim() || !newItemMeasurement.trim()) return;

    const newItem: GroceryItem = {
      id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      name: newItemName,
      measurement: newItemMeasurement,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName('');
    setNewItemMeasurement('');
  };

  const handleEdit = (id: number, name: string, measurement: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, name, measurement } : item
    );
    setItems(updatedItems);
  };

  const buttonPressed = () => {
    setIsMealRequestOpen(!isMealRequestOpen);
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  const handleSubmit = async () => {
    if (!user) {
      setToastMessage('Please sign in to search for recipes.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const queryParams: Record<string, any> = {
        query: inputValue,
        number: 5,
        instructionsRequired: true,
        addRecipeInformation: true,
      };

      // Add UserProfile preferences
      if (userProfile?.likedFoods) {
        queryParams.includeIngredients = userProfile.likedFoods;
      }
      if (userProfile?.dislikedFoods) {
        queryParams.excludeIngredients = userProfile.dislikedFoods;
      }
      if (userProfile?.diet) {
        queryParams.diet = userProfile.diet;
      }
      if (userProfile?.intolerances) {
        queryParams.intolerances = userProfile.intolerances;
      }

      // Add cuisine preferences
      if (selectedPrefCuisines.length > 0) {
        queryParams.cuisine = selectedPrefCuisines.map(option => option.value).join(',');
      }
      if (selectedExcludeCuisines.length > 0) {
        queryParams.excludeCuisine = selectedExcludeCuisines.map(option => option.value).join(',');
      }

      const response = await client.queries.SpoonacularGetRecipe({
        path: '/recipes/complexSearch',
        httpMethod: 'GET',
        queryStringParameters: queryParams,
        pathParameters: {},
      });

      if (response.data) {
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const recipes = data.results || [];
        navigate('/searchResults', { state: { recipes } });
      } else {
        console.error("No data in response:", response);
        setError('No data returned from Spoonacular');
      }
    } catch (error) {
      console.error("Detailed error:", error);
      setError('Failed to fetch recipes');
      setToastMessage('Failed to fetch recipes.');
    } finally {
      setIsLoading(false);
      setIsMealRequestOpen(false);
    }
  };

  const handleDialogClose = () => {
    setItems([]);
    setIsMealRequestOpen(false);
  };

  // CUSTOM MEAL HANDLER
  const handleChange = async () => {
    if (!user) {
      setToastMessage('Please sign in to save custom meal.');
      return;
    }
    try {
      const userId = (await getCurrentUser()).userId;
      const { errors } = await client.models.SavedRecipe.create({
        userId,
        recipeId: `custom-${Date.now()}`,
        title: titleRef.current?.value || 'Custom Recipe',
        summary: instructionsRef.current?.value || '',
        simplifiedInstructions: items.map((item, index) => ({
          number: index + 1,
          step: `Add ${item.name} (${item.measurement}).`,
          ingredients: [item.name],
        })),
      });
      if (errors) {
        setToastMessage('Failed to save custom meal.');
      } else {
        setToastMessage('Custom meal saved successfully!');
        setIsMealRequestOpen(false);
      }
    } catch (error) {
      console.error('Error saving custom meal:', error);
      setToastMessage('Failed to save custom meal.');
    }
  };

  const autoResizeTextarea = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResizeTextarea(titleRef);
    autoResizeTextarea(descriptionRef);
    autoResizeTextarea(instructionsRef);
  }, [message]);

  return (
    <>
      <div className="main-container">
        <div className="header">
          <button onClick={() => navigate("/main")}>
            <div className="logo-text">ForkCast</div>
          </button>
          <div className="sidebar">
            <button className="icon-button" onClick={buttonPressed}>
              <RuxIcon className="icon-image" size="35px" icon="add-circle-outline" />
            </button>
            <button className="icon-button" onClick={() => navigate("/grocery-list")}>
              <RuxIcon className="icon-image" size="small" icon="local-grocery-store" />
            </button>
            <button className="icon-button" onClick={() => navigate("/profile")}>
              <RuxIcon className="icon-image" size="small" icon="account-circle" />
            </button>
            <button className="icon-button" onClick={() => navigate("/")}>
              <RuxIcon className="icon-image" size="small" icon="settings" />
            </button>
          </div>
        </div>

        {isMealRequestOpen && (
          <RuxDialog
            className="light-theme"
            open={isMealRequestOpen}
            confirmText=""
            denyText=""
          >
            <RuxTabs id="tab-set-id-1" className="tab-set" class="light-theme">
              <RuxTab className="tab-request" id="tab-id-1" class="light-theme">
                Request Meal
              </RuxTab>
              <RuxTab id="tab-id-2">Add Custom Meal</RuxTab>
            </RuxTabs>
            <RuxTabPanels aria-labelledby="tab-set-id-1">
              <RuxTabPanel aria-labelledby="tab-id-1">
                <div>Preferred Cuisines</div>
                <Select
                  options={cuisineOptions}
                  isMulti
                  value={selectedPrefCuisines}
                  onChange={handlePrefCuisinesChange}
                />
                <div>Cuisines to Exclude</div>
                <Select
                  options={cuisineOptions}
                  isMulti
                  value={selectedExcludeCuisines}
                  onChange={handleExcludeCuisinesChange}
                />
                Request
                <RuxInput
                  class="MRInput"
                  type="text"
                  value={inputValue}
                  onRuxchange={handleInputChange}
                />
                <div className="dialog-buttons">
                  <button className="mrCancel" onClick={handleDialogClose}>
                    Cancel
                  </button>
                  <button className="mrSubmit" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </RuxTabPanel>
              <RuxTabPanel aria-labelledby="tab-id-2">
                Recipe Title
                <textarea
                  ref={titleRef}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: "100%",
                    overflow: "clip",
                    resize: "none",
                    padding: "10px",
                    fontSize: "1rem",
                  }}
                />
                <div>Recipe Description</div>
                <textarea
                  ref={descriptionRef}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: "100%",
                    overflow: "clip",
                    resize: "none",
                    padding: "10px",
                    fontSize: "1rem",
                  }}
                />
                <div>Ingredients</div>
                <ul className="grocery-list">
                  {items.map((item) => (
                    <GroceryListItem
                      key={item.id}
                      item={item}
                      onEdit={handleEdit}
                    />
                  ))}
                </ul>
                <div className="add-ingredient" style={{ display: "flex", flexDirection: "row" }}>
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="input-field"
                    style={{ width: "11.25vw", height: "5vh" }}
                  />
                  <input
                    type="text"
                    placeholder="Measurement"
                    value={newItemMeasurement}
                    onChange={(e) => setNewItemMeasurement(e.target.value)}
                    className="input-field"
                    style={{ width: "11.25vw", height: "5vh" }}
                  />
                  <button onClick={handleAddItem} className="add-item-butn">
                    Add Item
                  </button>
                </div>
                <div>Recipe Instructions</div>
                <textarea
                  ref={instructionsRef}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: "100%",
                    overflow: "clip",
                    resize: "none",
                    padding: "10px",
                    fontSize: "1rem",
                  }}
                />
                <div className="dialog-buttons">
                  <button className="mrCancel" onClick={handleDialogClose}>
                    Cancel
                  </button>
                  <button className="mrSubmit" onClick={handleChange}>
                    Submit
                  </button>
                </div>
              </RuxTabPanel>
            </RuxTabPanels>
          </RuxDialog>
        )}
        {isLoading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {toastMessage && (
          <RuxToast
            message={toastMessage}
            closeAfter={3000}
          />
        )}
      </div>
    </>
  );
};
export default SideBar;