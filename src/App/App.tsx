import React, { useState, useEffect, createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { initProgress } from '../data/progress';

import { storage } from '../component/Utilities';
import MainNav from '../component/MainNav';
import Footer from '../component/Footer';

import Login from '../page/Login';
import Home from '../page/Home';
import Learn from '../page/Learn';
import Practice from '../page/Practice';
import Error from '../page/Error';

import './App.css';

export const ID = 'com.homework.app';
export const VERSION = '0.2.1';
export const CONTENT = '0.2.1';
export const PATH_INDEX = '/homework';
export const PATH_ERROR = PATH_INDEX + '/error';

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
               <div>
                  <MainNav />
               </div>
               <Routes>
                  <Route path={PATH_INDEX + '/learn/:id'} element={<Learn />} />
                  <Route
                     path={PATH_INDEX + '/practice/:id'}
                     element={<Practice />}
                  />
                  <Route path={PATH_INDEX} element={<Home />} />
                  <Route path={PATH_INDEX + '/error'} element={<Error />} />
                  <Route path="/" element={<Navigate to={PATH_INDEX} />} />
                  <Route path="*" element={<Navigate to={PATH_ERROR} />} />
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
