import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import Profile from './Profile';
import RecipeDetails from './RecipeDetails';
import SearchResultsPage from "./SearchResultsPage";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
// import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recipeDetails" element={<RecipeDetails />} />
      <Route path="/searchResults" element={<SearchResultsPage />} />
    </Routes>
  </Router>
);
