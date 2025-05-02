import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './Left_SideBar.css';
import { useState, useRef, useEffect } from "react";
import { RuxIcon, RuxDialog} from "@astrouxds/react";
import { useNavigate } from "react-router-dom";

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

const LSideBar = ({ recipe }: { recipe: SpoonacularRecipe }) => {
  const [EditOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();
  const [icon, setIcon] = useState("start");
  const [editedRecipe, setEditedRecipe] = useState(recipe);
  const [descriptionHeight, setDescriptionHeight] = useState<number | undefined>(undefined);
 

  const getTextAreaHeight = (text: string, width = 700, font = "16px sans-serif") => {
    const hidden = document.createElement("textarea");
    hidden.style.position = "absolute";
    hidden.style.visibility = "hidden";
    hidden.style.height = "auto";
    hidden.style.width = `${width}px`;
    hidden.style.font = font;
    hidden.style.padding = "10px";
    hidden.style.boxSizing = "border-box";
    hidden.style.lineHeight = "1.5";
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
      const height = getTextAreaHeight(editedRecipe.summary, 700, "16px sans-serif");
      setDescriptionHeight(height);
    }
  }, [EditOpen, editedRecipe.summary]);
  
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
  style={{ width: "80vw", maxWidth: "900px" }} 
>
  <div>Recipe Title</div>
  <textarea
    value={editedRecipe.title}
    onChange={(e) => {
      setEditedRecipe((prev) => ({ ...prev, title: e.target.value }));
      const textarea = e.target;
      textarea.style.height = "auto"; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight

    }}
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
    value={editedRecipe.summary}
    onChange={(e) => 
      setEditedRecipe((prev) => ({ ...prev, summary: e.target.value }))}
      style={{
      width: "100%",
      overflow: "clip",
      resize: "none",
      padding: "10px",
      fontSize: "1rem",
      height: descriptionHeight ? `${descriptionHeight}px` : "auto",
    }}
  />

  <div>Ingredients</div>
  <ul className="grocery-list">
    {recipe.ingredients.map((ingredient, index) => (
      <li key={index} className="grocery-item">
        <input
          type="text"
          value={ingredient.name}
          onChange={(e) => {
            const updatedIngredients = [...recipe.ingredients];
            updatedIngredients[index].name = e.target.value;
            // setEditedRecipe((prev) => ({
            //   ...prev,
            //   ingredients: updatedIngredients,
            // }));
          }}
          className="edit-input"
          style={{ width: "45%", marginRight: "10px" }}
        />
        <input
          type="text"
          value={`${ingredient.amount} ${ingredient.unit}`}
          onChange={(e) => {
            const updatedIngredients = [...recipe.ingredients];
            const [amount, unit] = e.target.value.split(" ");
            updatedIngredients[index].amount = parseFloat(amount) || 0;
            updatedIngredients[index].unit = unit || "";
            // setEditedRecipe((prev) => ({
            //   ...prev,
            //   ingredients: updatedIngredients,
            // }));
          }}
          className="edit-input"
          style={{ width: "45%" }}
        />
      </li>
    ))}
  </ul>

  <div>Recipe Instructions</div>
  <textarea
    value={editedRecipe.instructions}
    onChange={(e) =>
      setEditedRecipe((prev) => ({ ...prev, instructions: e.target.value })) 
    }
    style={{
      width: "100%",
      overflow: "clip",
      resize: "none",
      padding: "10px",
      fontSize: "1rem",
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