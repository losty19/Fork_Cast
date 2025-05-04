import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './Left_SideBar.css';
import { useState, useRef, useEffect } from "react";
import { RuxIcon, RuxDialog} from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import { SpoonacularRecipe } from "./types/SpoonacularRecipe";

const LSideBar = ({ recipe }: { recipe: SpoonacularRecipe }) => {
  const [EditOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();
  const [icon, setIcon] = useState("star-border");
  const [message, setMessage] = useState(recipe.summary || '');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAddToGroceryList = () => {
    const stored = localStorage.getItem('groceryItems');
    let existingItems = stored ? JSON.parse(stored) : [];
    let maxId = existingItems.reduce((max: number, item: any) => Math.max(max, item.id), 0);
    const ingredients = recipe.simplifiedInstructions?.flatMap(step => step.ingredients || []) || [];
    ingredients.forEach(ingredient => {
      maxId++;
      existingItems.push({
        id: maxId,
        name: ingredient,
        quantity: 1, // Default quantity, as API doesn't provide amount
        measurement: '',
        checked: false
      });
    });
    localStorage.setItem('groceryItems', JSON.stringify(existingItems));
    navigate("/grocery-list");
  };

  const buttonPressed = () => {
    setEditOpen(!EditOpen);
  };

  const handleSubmit = async () => {};

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  const handleDialogClose = () => {
    setEditOpen(false);
  };

  return (
    <>
      <div className="side_container">
        <button className="side-button" onClick={() => navigate(-1)}>
          <RuxIcon className="side-image" icon="reply" size="3.3rem" />
          <h2 style={{ marginTop: '-10%' }}>BACK</h2>
        </button>
        <button className="side-button" onClick={handleAddToGroceryList}>
          <RuxIcon className="side-image" icon="add-shopping-cart" size="3.3rem" />
          <h2 style={{ marginTop: '-5%', marginBottom: '-4%' }}>ADD TO GROCERY LIST</h2>
        </button>
        <button className="side-button">
          <RuxIcon
            className="side-image"
            size="3.5rem"
            icon={icon}
            onClick={() => setIcon(icon === "star-border" ? "star" : "star-border")}
          />
          <h2 style={{ marginTop: '-5%' }}>FAVOR</h2>
        </button>
        <button className="side-button" onClick={buttonPressed}>
          <RuxIcon className="side-image" icon="edit" size="2.9rem" />
          <h2 style={{ marginTop: '0%' }}>EDIT RECIPE</h2>
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
        <textarea
          ref={textareaRef}
          className="MRInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            minHeight: "50vh",
            maxHeight: "70vh",
            overflow: "auto",
            resize: "none",
            padding: "10px",
            fontSize: "1rem",
          }}
        />
        <div className="dialog-buttons">
          <button className="mrCancel" onClick={handleDialogClose}>Cancel</button>
          <button className="mrSubmit" onClick={handleSubmit}>Submit</button>
        </div>
      </RuxDialog>
    </>
  );
};

export default LSideBar;