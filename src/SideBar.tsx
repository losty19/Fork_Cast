import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
// import { Authenticator } from '@aws-amplify/ui-react';
import { useState, useRef, useEffect } from "react";
import { RuxIcon, RuxDialog, RuxInput, } from "@astrouxds/react";
import { RuxTabs, RuxTab, RuxTabPanels, RuxTabPanel } from '@astrouxds/react';
import { useNavigate } from "react-router-dom";
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>()

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  summary: string;
  instructions: string;
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    original: string;
  }>;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}
interface GroceryListItemProps {
  item: GroceryItem;
  onEdit: (id: number, name: string, measurement: string) => void;
}
interface SpoonacularResponse {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

interface RuxInputEvent extends Event {
  target: HTMLInputElement;
}

interface GroceryItem {
  id: number;
  name: string;
  measurement: string;
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
          
        <li className={`grocery-item`}>
      
          {isEditing ? (
            <div className="edit-mode" style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="edit-input"
                style={{width:"11.25vw", height:"5vh"}}
              />
              <input
                type="text"
                value={newMeasurement}
                onChange={(e) => setNewMeasurement(e.target.value)}
                className="edit-input"
                style={{width:"11.25vw", height:"5vh"}}
              />
            </div>
          ) : (
            <div className="display-mode">
              <span className="item-name" style={{color:"black"}}>{item.name}</span>
              <span className="item-measurement"style={{color:"black"}}>{item.measurement}</span>
            </div>
          )}
          <button onClick={handleEditToggle} className="edit-butn">
                  {isEditing ? 'Save' : 'Edit'}
              </button>
        </li>
      );
    };

const SideBar = () => {
    const [isMealRequestOpen, setIsMealRequestOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const instructionsRef = useRef<HTMLTextAreaElement | null>(null);
    const [newItemName, setNewItemName] = useState('');
    const [newItemMeasurement, setNewItemMeasurement] = useState('');
    
    const [items, setItems] = useState<GroceryItem[]>([
          ]);
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
  

    const navigate = useNavigate();

    const buttonPressed = () => {
      setIsMealRequestOpen(!isMealRequestOpen);
    }

    const handleInputChange = (e: RuxInputEvent) => {
      setInputValue(e.target.value);
    }
  
    const handleSubmit = async () => {
      setIsLoading(true);
      setError(null);
      console.log("Input Value: ", inputValue);
      try {
        const spoonacular_response = await client.queries.SpoonacularGetRecipe({
          path: '/recipes/search', 
          httpMethod: 'GET', 
          queryStringParameters: {query: inputValue},
          pathParameters: {}
        });
        console.log("spoonacular_response is: ", spoonacular_response);
        if (spoonacular_response.data) {
          // const recipes = spoonacular_response.data.body as Schema["GetRecipeResponse"];
          navigate('/searchResults', { state: { recipes:  spoonacular_response.data } });
        } else {
          console.error('Error searching recipes: Invalid response format. This is spoonacular_response: ', spoonacular_response);
        }
      } catch (error) {
        setError('Failed to fetch recipe');
        console.error('Error searching recipes:', error);
      } finally {
        setIsLoading(false);
        setIsMealRequestOpen(false);
      }
    }
    const handleDialogClose = () => {
      setItems([]);
      setIsMealRequestOpen(false);
    }
    const handleChange = async() => {
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
    }, [message]); // or make individual states if you want granular control
    

    return (
      <>
        
    <div className="main-container">
    <div className="header">
      <button onClick={() => navigate("/main")}>
          <div className="logo-text">ForkCast</div>
      </button>
      
        <div className="sidebar">
          <button className="icon-button" onClick={buttonPressed}>
            <RuxIcon className="icon-image" size="35px" icon="add-circle-outline"></RuxIcon>
          </button>
          <button className="icon-button" onClick={() => navigate("/grocery-list")}>
            <RuxIcon className="icon-image" size="small" icon="local-grocery-store"></RuxIcon>
          </button>
          <button className="icon-button" onClick={() => navigate("/profile")}>
            <RuxIcon className="icon-image" size="small" icon="account-circle"></RuxIcon>
          </button>
          <button className="icon-button">
            <RuxIcon className="icon-image"size="small" icon="settings"></RuxIcon>
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
                    <RuxTab className= "tab-request" id="tab-id-1"
                    class="light-theme"
                    >Request Meal</RuxTab>
                    <RuxTab id="tab-id-2">Add Custom Meal</RuxTab>
                  </RuxTabs>
                  <RuxTabPanels aria-labelledby="tab-set-id-1">
                    <RuxTabPanel aria-labelledby="tab-id-1">Request
                    <RuxInput class="MRInput" type="text" value={inputValue} onRuxchange={(e) => handleInputChange(e as unknown as RuxInputEvent)}/>
                      <div className="dialog-buttons">
                        <button className="mrCancel" onClick={handleDialogClose}> Cancel</button>
                        <button className="mrSubmit" onClick={handleSubmit}> Submit</button>
                      </div>
                    </RuxTabPanel>
                    <RuxTabPanel aria-labelledby="tab-id-2">Recipe Title
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
                        style={{width:"11.25vw", height:"5vh"}}
                      />
                      <input
                        type="text"
                        placeholder="Measurement"
                        value={newItemMeasurement}
                        onChange={(e) => setNewItemMeasurement(e.target.value)}
                        className="input-field"
                        style={{width:"11.25vw", height:"5vh"}}
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
                        <button className="mrCancel" onClick={handleDialogClose}> Cancel</button>
                        <button className="mrSubmit" onClick={handleChange}> Submit</button>
                      </div>
                    </RuxTabPanel>
                  </RuxTabPanels>

                </RuxDialog>
              )}
              {isLoading && <div className="loading">Loading...</div>}
          {error && <div className="error">{error}</div>}
          </div>
              </>
    );
  }
export default SideBar;  