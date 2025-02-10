import React from "react";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import { RuxTabs, RuxTab } from "@astrouxds/react";

const MainPage: React.FC = () => {


  return (
    <div>
        <RuxTabs id="tab-set-id-1">
            <RuxTab>Tab1</RuxTab>
            <RuxTab>Tab2</RuxTab>
            <RuxTab>Tab3</RuxTab>
        </RuxTabs>
    </div>
  );
}

export default MainPage;
