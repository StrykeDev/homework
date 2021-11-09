import React, { useState, useEffect, createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { initProgress } from '../data/courses';
import MainNavbar from '../component/MainNavbar';
import Login from '../page/Login';
import Home from '../page/Home';
import Learn from '../page/Learn';
import Practice from '../page/Practice';
import Error from '../page/Error';
import './App.css';

export const userContext = createContext<string>('');

// Local storage entries
const APP_ID = 'com.c-sharp.app';
const APP_VER = '0.1.0';
const USER = 'user';

function App(): React.ReactElement {
   const [user, setUser] = useState<string>(
      window.localStorage.getItem(USER) || '',
   );

   useEffect((): void => {
      if (window.localStorage.getItem('app_id') !== APP_ID) {
         window.localStorage.clear();
         window.localStorage.setItem('app_id', APP_ID);
         window.localStorage.setItem('app_ver', APP_VER);
         initProgress();
         setUser('');
      } else if (window.localStorage.getItem('app_ver') !== APP_VER) {
         window.localStorage.setItem('app_ver', APP_VER);
         initProgress();
      }
   }, [user]);

   function handleLogin(newUser: string): void {
      if (newUser && newUser !== user) {
         window.localStorage.setItem(USER, newUser);
         setUser(newUser);
      }
   }

   function renderApp(): React.ReactElement {
      return (
         <userContext.Provider value={user}>
            <MainNavbar />
            <Routes>
               <Route path="/homework/learn/:id" element={<Learn />} />
               <Route path="/homework/practice/:id" element={<Practice />} />
               <Route path="/homework" element={<Home />} />
               <Route path="/homework/error" element={<Error />} />
               <Route path="*" element={<Navigate to="/homework/error" />} />
            </Routes>
         </userContext.Provider>
      );
   }

   return (
      <div className="app">
         {user ? renderApp() : <Login onLogin={handleLogin} />}
      </div>
   );
}

export default App;
