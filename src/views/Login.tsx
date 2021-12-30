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
      <div className="container my-4 py-4 text-center">
         <h2>
            Welcome to <span className="title">Homework</span>!
         </h2>
         <h3>Lets get started.</h3>
         <div className="dialog my-2 p-1 bg-normal rounded">
            <p>
               <FontAwesomeIcon icon={faUserCircle} size="10x" />
            </p>
            <form onSubmit={(event) => handleRegister(event, true)} className="mt-2">
               <input
                  className="text-center"
                  type="text"
                  placeholder="What are we going to call you?"
                  value={inputName}
                  onChange={(event) => setInputName(event.currentTarget.value)}
               />
               <input className="btn btn-accent" type="submit" value="Start learning" />
            </form>
         </div>
      </div>
   );
}

export default Login;
