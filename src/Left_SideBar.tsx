import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './Left_SideBar.css';
import { useState } from "react";
import { RuxIcon, RuxDialog } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import EditRecipe from './EditRecipe';

const LSideBar = () => {
  const [EditOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();
  const [icon, setIcon] = useState("start");

  // Function to toggle EditOpen state (only for the "edit" button)
  const buttonPressed = () => {
      setEditOpen(!EditOpen);
  };

  return (
      <div className="main-container">
          <div className="side_container">
              {/* Back Button */}
              <button className="side-button" onClick={() => navigate("/main")}>
                  <RuxIcon className="side-image" icon="reply" size="3.3rem" />
                  <h1 style={{marginTop:'-10%'}}>BACK</h1>
              </button>

              {/* Grocery List Button */}
              <button className="side-button" onClick={() => navigate("/grocery-list")}>
                  <RuxIcon className="side-image" icon="add-shopping-cart" size="3.3rem" />
                  <h1 style={{marginTop:'-5%',marginBottom:'-4%'}}>ADD TO GROCERY LIST</h1>
              </button>

              {/* Star Icon Button */}
              <button className="side-button">
                  <RuxIcon
                      className="side-image"
                      size="3.5rem"
                      icon={icon === "start" ? "star-border" : "star"}
                      onClick={() => setIcon(icon === "start" ? "star" : "start")}
                  />
                  <h1 style={{marginTop:'-5%'}}>FAVOR</h1>
              </button>

              {/* Edit Button */}
              <button className="side-button" onClick={buttonPressed}>
                  <RuxIcon className="side-image" icon="edit" size="2.9rem" />
                  <h1 style={{marginTop:'0%'}}>EDIT RECIPE</h1>
              </button>
          </div>

          <EditRecipe />
          <RuxDialog open={EditOpen} header="Header" message="Content goes here" confirm-text="Confirm" deny-text="Cancel" />
      </div>
  );
};

export default LSideBar; 