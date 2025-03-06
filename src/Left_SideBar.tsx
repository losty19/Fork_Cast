import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './Left_SideBar.css';
import { useState } from "react";
import { RuxIcon, RuxDialog } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import EditRecipe from './EditRecipe';

const SideBar = () => {
   const [EditOpen, setEditOpen] = useState(false);
    const navigate = useNavigate();
    const [icon, setIcon] = useState("start");
    const buttonPressed = () => {
      setEditOpen(!EditOpen);
    }
    return (
      <div className="main-container">
      <div className="side_container">
    
            <button className="icon-button" onClick={() => navigate("/main")}>
              <RuxIcon icon="close" size="3rem"/>
         </button> 
    <button className="icon-button" onClick={() => navigate("/grocery-list")}>
              <RuxIcon icon="add-shopping-cart" size="2.5rem" />
         </button>     
              <button className="favorbutton">
              <RuxIcon
            className="favorbutton_icon"
            icon={icon === "start" ? "star-border" : "star"}
            onClick={() => setIcon(icon === "start" ? "star" : "start")}
            style={{ color: 'rgb(113, 171, 251)' }}
              />
            </button>
            <button className="icon-button" onClick={buttonPressed}>
              <RuxIcon icon="edit" size="2.2rem" />
         </button> 
            </div>
            <EditRecipe/>
	        <RuxDialog open={EditOpen}  header="Header" message="Content goes here" confirm-text="Confirm" deny-text="Cancel">
	          </RuxDialog>
            </div>
    )
}
export default SideBar; 