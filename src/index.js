import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { initializeApp } from "firebase/app";

import ThemeProvider from './context/ThemeContext';
import NavContextProvider from './context/NavContext';
import FavoritesContextProvider from './context/FavoritesContext';
import RecentSearchContextProvider from './context/RecentSearchContext';
import UserContextProvider from './context/UserContext';
import BathroomsContextProvider from './context/BathroomsContext';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  authDomain: "gnb-finder.firebaseapp.com",
  projectId: "gnb-finder",
  storageBucket: "gnb-finder.appspot.com",
  messagingSenderId: "869138217478",
  appId: "1:869138217478:web:1a125f4432b28b8fdce187"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>

    <BrowserRouter>
      <ThemeProvider>
        <UserContextProvider>
          <NavContextProvider>
            <BathroomsContextProvider>
              <FavoritesContextProvider>
                <RecentSearchContextProvider>
                <App />
                </RecentSearchContextProvider>
              </FavoritesContextProvider>
            </BathroomsContextProvider>
          </NavContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </BrowserRouter>
    

    
  //</React.StrictMode>
);
