import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { PATH_INDEX } from '../utils/constants';

interface ILoginProps {
   onLogin: (username: string, preview?: boolean) => void;
}

function Login({ onLogin }: ILoginProps): React.ReactElement {
   const [inputName, setInputName] = useState('');
   const navigate = useNavigate();

   function handleRegister(event: any, preview: boolean): void {
      event.preventDefault();
      if (inputName) {
         const name = inputName.split(' ')[0];
         const displayName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
         onLogin(displayName, preview);
         navigate(PATH_INDEX);
      }
   }

   return (
      <div className="my-2 text-center">
         <div className="mb-2">
            <h1>
               Welcome to <span className="title">Homework</span>!
            </h1>
            <h3>Lets get started.</h3>
         </div>
         <div className="dialog bg-normal rounded">
            <div className="p-2">
               <FontAwesomeIcon icon={faUserCircle} size="10x" />
               <form onSubmit={(event) => handleRegister(event, false)} className="mt-2">
                  <input
                     className="text-center"
                     type="text"
                     placeholder="What are we going to call you?"
                     value={inputName}
                     onChange={(event) => setInputName(event.currentTarget.value)}
                  />
                  <input className="btn bg-accent" type="submit" value="Start learning" />
                  <button className="btn" onClick={(event) => handleRegister(event, true)}>
                     Take a tour
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Login;
