import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import Profile from "./Profile";
import RecipeDetails from './RecipeDetails';
import SearchResultsPage from "./SearchResultsPage";
import "./index.css";
//import { Amplify } from "aws-amplify";
//import outputs from "../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useAuthenticator } from '@aws-amplify/ui-react';

//Amplify.configure(outputs);

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  // If no user is authenticated, redirect to the home page (or a login page)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<MainPage />} />

        {/* Protected Routes */}
        <Route 
          path="/main" 
          element={ 
            
              <MainPage /> 
            
          }
        />
        
        <Route 
          path="/profile" 
          element={
            <Profile />
          } 
        />

        <Route 
          path="/recipeDetails" 
          element={
            <RecipeDetails />
          } 
        />

        <Route 
          path="/searchResults" 
          element={
            <SearchResultsPage />
          } 
        />

      </Routes>
    </Router>
);
