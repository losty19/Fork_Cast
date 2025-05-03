import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './Left_SideBar.css';
import { useState, useRef, useEffect } from "react";
import { RuxIcon, RuxDialog} from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  summary: string
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
const unitOptions = [
  { value: 'cup', label: 'Cup' },
  { value: 'tablespoon', label: 'Tablespoon' },
  { value: 'teaspoon', label: 'Teaspoon' },
  { value: 'pint', label: 'Pint' },
  { value: 'quart', label: 'Quart' },
  { value: 'liter', label: 'Liter' },
  { value: 'gram', label: 'Gram' },
  { value: 'kilogram', label: 'Kilogram' },
  { value: 'ounce', label: 'Ounce' },
  { value: 'pound', label: 'Pound' },
  { value: 'slice', label: 'Slice' },
  { value: 'piece', label: 'Piece' },
];

const LSideBar = ({ recipe }: { recipe: SpoonacularRecipe }) => {
  const [EditOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();
  const [icon, setIcon] = useState("start");
  const [editedRecipe, setEditedRecipe] = useState(recipe);
  const [descriptionHeight, setDescriptionHeight] = useState<number | undefined>(undefined);
  const [titleHeight, setTitleHeight] = useState<number | undefined>(undefined);
  const [instructionsHeight, setInstructionHeight] = useState<number | undefined>(undefined);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientAmount, setNewIngredientAmount] = useState<number | undefined>(undefined);
  const [newIngredientUnit, setNewIngredientUnit] = useState('');
  const [editingStates, setEditingStates] = useState<{ [key: number]: boolean }>({}); // Track editing state by ingredient ID
  const handleEditToggle = (id: number) => {
    setEditingStates((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the editing state for the given ingredient ID
    }));
  };

  const getTextAreaHeight = (text: string) => {
    const hidden = document.createElement("textarea");
    hidden.style.position = "absolute";
    hidden.style.height = "auto";
    hidden.style.width = "34vw";
    hidden.style.fontFamily = "monospace";
    hidden.style.fontSize = "16.67px";
    hidden.style.padding = "7px";
    hidden.value = text;
    document.body.appendChild(hidden);
    const height = hidden.scrollHeight;
    document.body.removeChild(hidden);
    return height;
  };

  const handleAddToGroceryList = () => {
    const stored = localStorage.getItem('groceryItems');
    let existingItems = stored ? JSON.parse(stored) : [];
    let maxId = existingItems.reduce((max: number, item: any) => Math.max(max, item.id), 0);
    recipe.ingredients.forEach(ingredient => {
      maxId++;
      existingItems.push({
        id: maxId,
        name: ingredient.name,
        quantity: ingredient.amount,
        measurement: ingredient.unit,
        checked: false
      });
    });
    localStorage.setItem('groceryItems', JSON.stringify(existingItems));
    navigate("/grocery-list");
  };
  
  
  const buttonPressed = () => {
      setEditOpen(!EditOpen);
  };

  const handleSubmit = async (updatedRecipe: SpoonacularRecipe) => {
 
    // Add logic to save the updated recipe

    setEditOpen(false);
  };

  const handleDialogClose = () => {
    setEditedRecipe(recipe);
    setEditOpen(false);
  }
  
 
  useEffect(() => {
    if (EditOpen) {
      const heightTitle = getTextAreaHeight(editedRecipe.title);
      setTitleHeight(heightTitle);
      const heightSummary = getTextAreaHeight(editedRecipe.summary);
      setDescriptionHeight(heightSummary);
      const heightInstructions = getTextAreaHeight(editedRecipe.instructions);
      setInstructionHeight(heightInstructions);
    }
  }, [EditOpen, editedRecipe.summary, editedRecipe.instructions, editedRecipe.title]);
  
  return (
    <>
      
          <div className="side_container">
              {/* Back Button */}
              <button className="side-button" onClick={() => navigate("/main")}>
                  <RuxIcon className="side-image" icon="reply" size="3.3rem" />
                  <h2 style={{marginTop:'-10%'}}>BACK</h2>
              </button>

              {/* Grocery List Button */}
              <button className="side-button" onClick={handleAddToGroceryList}>
                  <RuxIcon className="side-image" icon="add-shopping-cart" size="3.3rem" />
                  <h2 style={{marginTop:'-5%',marginBottom:'-4%'}}>ADD TO GROCERY LIST</h2>
              </button>

              {/* Star Icon Button */}
              <button className="side-button">
                  <RuxIcon
                      className="side-image"
                      size="3.5rem"
                      icon={icon === "start" ? "star-border" : "star"}
                      onClick={() => setIcon(icon === "start" ? "star" : "start")}
                  />
                  <h2 style={{marginTop:'-5%'}}>FAVOR</h2>
              </button>

              {/* Edit Button */}
              <button className="side-button" onClick={buttonPressed}>
                  <RuxIcon className="side-image" icon="edit" size="2.9rem" />
                  <h2 style={{marginTop:'0%'}}>EDIT RECIPE</h2>
              </button>
          </div>

         
          <RuxDialog
            className="edit-recipe-container light-theme" 
            open={EditOpen}
            header="Edit Recipe"
            confirmText=""
            denyText=""
            style={{ width: "80vw", maxWidth: "900px" }} >
            <div>Recipe Title</div>
            
            <textarea
              value={editedRecipe.title}
              onChange={(e) => 
                setEditedRecipe((prev) => ({ ...prev, title: e.target.value }))}
              style={{
                width: "34vw",
                overflow: "hidden",
                resize: "none",
                padding: "7px",
                fontSize: "17px",
                height: titleHeight ? `${titleHeight}px` : "auto",

              }}
            />

          <div>Recipe Description</div>
          <textarea
            value={editedRecipe.summary}
            onChange={(e) => 
              setEditedRecipe((prev) => ({ ...prev, summary: e.target.value }))}
              style={{
              width: "34vw",
              overflow: "hidden",
              resize: "none",
              padding: "7px",
              fontSize: "17px",
              height: descriptionHeight ? `${descriptionHeight}px` : "auto",
            }}
          />

<div>Ingredients</div>
      <ul className="grocery-list">
        {editedRecipe.ingredients.map((ingredient, index) => (
          <li key={ingredient.id} className="grocery-item">
            {editingStates[ingredient.id] ? (
              // Edit Mode
              <div className="edit-mode" style={{ display: "flex", flexDirection: "row" }}>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => {
                    const updatedIngredients = [...editedRecipe.ingredients];
                    updatedIngredients[index].name = e.target.value;
                    setEditedRecipe((prev) => ({
                      ...prev,
                      ingredients: updatedIngredients,
                    }));
                  }}
                  className="edit-input"
                  style={{ height: "5vh", width: "9vw" }}
                />
                <input
                  type="text"
                  placeholder="Measurement"
                  value={newIngredientAmount !== undefined ? newIngredientAmount.toString() : ''}
                  
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        setNewIngredientAmount(undefined); 
                      } else if (!isNaN(Number(value))) {
                        setNewIngredientAmount(Number(value)); 
                      }
                    }}
                    className="input-field"
                  style={{ height: "5vh", width: "9vw" }}
                />
                <Select
                  value={unitOptions.find((o) => o.value === ingredient.unit) || null}
                  onChange={(selectedOption) => {
                    const updatedIngredients = [...editedRecipe.ingredients];
                    updatedIngredients[index].unit = selectedOption ? selectedOption.value : '';
                    setEditedRecipe((prev) => ({
                      ...prev,
                      ingredients: updatedIngredients,
                    }));
                  }}
                  options={unitOptions}
                  className="input-field-select-meal"
                  placeholder="Unit"
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "5vh",
                      width: "9vw",
                      borderRadius: "10px",
                    }),
                  }}
                />
                    <button
                  onClick={() => {
                    const updatedIngredients = editedRecipe.ingredients.filter((_, i) => i !== index);
                    setEditedRecipe((prev) => ({
                      ...prev,
                      ingredients: updatedIngredients,
                    }));
                  }}
                  className="delete-butn"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleEditToggle(ingredient.id)} 
                  className="edit-button"
                >
                  Save
                </button>
              </div>
            ) : (
              // Display Mode
              <div className="display-mode" style={{fontSize: "1.2rem" }}>
                <span className="item-name" style={{ color:"black"}}>{ingredient.name}</span>
                <span className="item-amount" >{ingredient.amount}</span>
                <span className="item-unit" >{ingredient.unit}</span>
                <button
                  onClick={() => handleEditToggle(ingredient.id)} 
                  className="edit-button"
                >
                  Edit
                </button>
                
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Add New Ingredient Form */}
      <div className="add-ingredient" style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Ingredient Name"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
          className="input-field"
          style={{ height: "5vh", width: "9vw" }}
        />
        <input
          type="text"
          placeholder="Measurement"
          value={newIngredientAmount !== undefined ? newIngredientAmount.toString() : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setNewIngredientAmount(undefined); 
          } else if (!isNaN(Number(value))) {
            setNewIngredientAmount(Number(value)); 
          }}}
          className="input-field"
          style={{ height: "5vh", width: "9vw" }}
        />
        <Select
          value={unitOptions.find((o) => o.value === newIngredientUnit) || null}
          onChange={(selectedOption) => setNewIngredientUnit(selectedOption ? selectedOption.value : '')}
          options={unitOptions}
          className="input-field-select-meal"
          placeholder="Unit"
          styles={{
            control: (base) => ({
              ...base,
              height: "5vh",
              width: "9vw",
              borderRadius: "10px",
            }),
          }}
        />
        <button
          onClick={() => {
            if (newIngredientName.trim() && newIngredientAmount && newIngredientUnit) {
              const newIngredient = {
                id: Date.now(),
                name: newIngredientName,
                amount: (newIngredientAmount),
                unit: newIngredientUnit,
                original: `${newIngredientAmount} ${newIngredientUnit} ${newIngredientName}`, 
              };
              setEditedRecipe((prev: SpoonacularRecipe): SpoonacularRecipe => ({
                ...prev, 
                ingredients: [...prev.ingredients, newIngredient], 
              }));
              setNewIngredientName('');
              setNewIngredientAmount(undefined);
              setNewIngredientUnit('');
            }
          }}
          className="add-item-butn"
        >
          Add Item
        </button>
      </div>
  <div>Recipe Instructions</div>
  <textarea
    value={editedRecipe.instructions}
    onChange={(e) =>
      setEditedRecipe((prev) => ({ ...prev, instructions: e.target.value })) 
    }
    style={{
      width: "100%",
      overflow: "hidden",
      resize: "none",
      padding: "7px",
      fontSize: "17px",
      height: instructionsHeight ? `${instructionsHeight}px` : "auto",
    }}
  />

  <div className="dialog-buttons">
    <button className="mrCancel" onClick={handleDialogClose}>Cancel</button>
    <button
      className="mrSubmit"
      onClick={() => {
        handleSubmit(recipe); 
      }}
    >
      Submit
    </button>
  </div>
</RuxDialog>
    </>
  );
};

export default LSideBar;