import React, { useState, useEffect, createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { initProgress } from '../data/courses';

import { storage } from '../component/Utilities';

import MainNavbar from '../component/MainNavbar';
import Footer from '../component/Footer';

import Login from '../page/Login';
import Home from '../page/Home';
import Learn from '../page/Learn';
import Practice from '../page/Practice';
import Error from '../page/Error';

import './App.css';

export const ID = 'com.homework.app';
export const VERSION = '0.1.2';
export const CONTENT = '0.1.2';
export const INDEX = '/homework/net';

export const userContext = createContext<string>('');

// Local storage entries
const APP_VER = 'version';
const CONTENT_VER = 'content';
const USERNAME = 'username';

function App(): React.ReactElement {
   const [username, setUser] = useState<string>(storage.get(USERNAME));

   useEffect((): void => {
      if (storage.get(APP_VER) != VERSION) {
         storage.set(APP_VER, VERSION);
      }

      if (storage.get(CONTENT_VER) != CONTENT) {
         storage.set(CONTENT_VER, CONTENT);
         initProgress();
      }
   }, []);

   function handleLogin(newUsername: string): void {
      if (newUsername && newUsername !== username) {
         storage.set(USERNAME, newUsername);
         setUser(newUsername);
      }
   }

   if (username) {
      return (
         <div className="app">
            <userContext.Provider value={username}>
               <MainNavbar />
               <Routes>
                  <Route path={INDEX + '/learn/:id'} element={<Learn />} />
                  <Route
                     path={INDEX + '/practice/:id'}
                     element={<Practice />}
                  />
                  <Route path={INDEX} element={<Home />} />
                  <Route path={INDEX + '/error'} element={<Error />} />
                  <Route
                     path="*"
                     element={<Navigate to={INDEX + '/error'} />}
                  />
               </Routes>
               <Footer />
            </userContext.Provider>
         </div>
      );
   } else {
      return (
         <div className="app">
            <Login onLogin={handleLogin} />
            <Footer />
         </div>
      );
   }
}

export default App;
