import React from "react";
import { useNavigate } from "react-router-dom";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxButton, RuxAccordion, RuxAccordionItem, RuxCheckbox } from "@astrouxds/react";
import './Profile.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div>
      <RuxAccordion>
        <RuxAccordionItem>
          <div slot="label">Vegetables</div>
          <RuxCheckbox className="checkbox" label="Pepper"></RuxCheckbox>
          <RuxCheckbox className="checkbox" label="Onion"></RuxCheckbox>
          <RuxCheckbox className="checkbox" label="Broccoli"></RuxCheckbox>
          <RuxCheckbox className="checkbox" label="Spinach"></RuxCheckbox>
        </RuxAccordionItem>
        <RuxAccordionItem>
          <div slot="label">Title 2</div>
          <p>Content 2</p>
        </RuxAccordionItem>
        <RuxAccordionItem>
          <div slot="label">Title 3</div>
          <p>Content 3</p>
        </RuxAccordionItem>
      </RuxAccordion>
    </div>
    
  );
};

export default Profile;