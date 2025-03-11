import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import './Left_SideBar.css';
import { useState } from "react";
import { RuxIcon, RuxDialog } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";

const EditRecipe = () => {
   const [EditOpen, setEditOpen] = useState(false);
    const navigate = useNavigate();
    const [icon, setIcon] = useState("start");
    const buttonPressed = () => {
      setEditOpen(!EditOpen);
    }
    return (
            <div>
	        <RuxDialog open={EditOpen}  header="Header" message="Content goes here" confirm-text="Confirm" deny-text="Cancel">
	          </RuxDialog>
            </div>
    )
}
export default EditRecipe; 