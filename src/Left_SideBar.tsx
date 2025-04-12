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
  const [message, setMessage] = useState(recipe.summary);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonPressed = () => {
      setEditOpen(!EditOpen);
  };

  const handleSubmit = async () => {

  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  const handleDialogClose = () => {
    setEditOpen(false);
  }
  return (
    <>
      
          <div className="side_container">
              {/* Back Button */}
              <button className="side-button" onClick={() => navigate("/main")}>
                  <RuxIcon className="side-image" icon="reply" size="3.3rem" />
                  <h2 style={{marginTop:'-10%'}}>BACK</h2>
              </button>

              {/* Grocery List Button */}
              <button className="side-button" onClick={() => navigate("/grocery-list")}>
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

         
          {/* Edit Recipe Dialog */}
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