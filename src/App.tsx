import React, { useState, useEffect, createContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';

// Services
import { LocalStorage } from './services/LocalStorage';

// Utils
import {
   USERNAME,
   APP_VER,
   VERSION,
   CONTENT_VER,
   CONTENT,
   PATH_INDEX,
   PATH_ERROR,
   PREVIEW,
   PATH_LEARN,
   PATH_PRACTICE,
   PATH_LOGIN,
   PATH_PROFILE,
} from './utils/constants';

// Views
import Home from './views/Home';
import Error from './views/Error';
import Login from './views/Login';
import Profile from './views/Profile';
import Learn from './views/Learn';
import Practice from './views/Practice';

// Style
import './styles/App.css';
import Layout from './components/Layout/Layout';
import { getCourses } from './data/courses';
import { updateScore, updateTestScore } from './data/Progress';
import { getTests } from './data/tests';
import Preview from './components/Preview';
import ContextLoader from './data/ContextLoader';

export const userContext = createContext<string>('');

function App(): React.ReactElement {
   const [username, setUsername] = useState<string>(LocalStorage.getItem(USERNAME));
   const [previewMode, setPreviewMode] = useState<boolean>(JSON.parse(LocalStorage.getItem(PREVIEW)));

   useEffect((): void => {
      if (LocalStorage.getItem(APP_VER) != VERSION) {
         LocalStorage.setItem(APP_VER, VERSION);
      }

      if (LocalStorage.getItem(CONTENT_VER) != CONTENT) {
         LocalStorage.setItem(CONTENT_VER, CONTENT);
      }
   }, []);

   function handleLogin(newUsername: string, preview: boolean = false): void {
      if (!username) {
         LocalStorage.setItem(USERNAME, newUsername);
         setUsername(newUsername);
         if (preview) {
            LocalStorage.setItem(PREVIEW, true);
            setPreviewMode(true);

            const courses = getCourses();
            courses.map((course) => {
               updateScore(course.id, (Math.random() + 0.9) / 2);
            });

            const tests = getTests();
            tests.map((test) => {
               updateTestScore(test.id, (Math.random() + 0.9) / 2);
            });
         } else {
            LocalStorage.setItem(PREVIEW, false);
            setPreviewMode(false);
         }
      }
   }

   return (
      <div className="app">
         <userContext.Provider value={username}>
            <ContextLoader>
               <Routes>
                  <Route path="/" element={<Layout />}>
                     <Route path={PATH_INDEX} element={<Home />} />
                     <Route path={PATH_ERROR} element={<Error />} />
                     <Route path={PATH_LOGIN} element={<Login onLogin={handleLogin} />} />
                     <Route path={PATH_PROFILE} element={<Profile />} />
                     <Route path={PATH_LEARN + ':id'} element={<Learn />} />
                     <Route path={PATH_PRACTICE + ':id'} element={<Practice />} />
                  </Route>
                  <Route path="/" element={<Navigate to={PATH_INDEX} />} />
                  <Route path="*" element={<Navigate to={PATH_ERROR} />} />
               </Routes>
            </ContextLoader>
         </userContext.Provider>

         <div className="overlay-container">{previewMode ? <Preview /> : ''}</div>
      </div>
   );
}

export default App;
