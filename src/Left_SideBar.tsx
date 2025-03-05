import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './Left_SideBar.css';
import { useState } from "react";
import { RuxIcon } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const [icon, setIcon] = useState("start");
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
            <button className="icon-button" onClick={() => navigate("/editRecipe")}>
              <RuxIcon icon="edit" size="2.2rem" />
         </button> 
            </div>
            </div>
    )
}
export default SideBar; 