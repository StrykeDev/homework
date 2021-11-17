import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

interface ILoginProps {
   onLogin: (username: string) => void;
}

function Login({ onLogin }: ILoginProps): React.ReactElement {
   const [inputName, setInputName] = useState('');

   function handleRegister(event: React.FormEvent): void {
      event.preventDefault();

      if (inputName) {
         const name = inputName.split(' ')[0];
         const displayName =
            name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
         onLogin(displayName);
      }
   }

   return (
      <div className="my-4 text-center">
         <div className="mb-2">
            <h1>
               Welcome to <span className="title">Homework</span>!
            </h1>
            <h3>Lets get started.</h3>
         </div>
         <div className="dialog bg-normal rounded">
            <div className="p-1">
               <FontAwesomeIcon icon={faUserCircle} size="10x" />
               <form onSubmit={handleRegister} className="mt-1">
                  <input
                     type="text"
                     placeholder="What are we going to call you?"
                     value={inputName}
                     onChange={(event) =>
                        setInputName(event.currentTarget.value)
                     }
                  />
                  <input className="btn" type="submit" value="Start learning" />
               </form>
            </div>
         </div>
      </div>
   );
}

export default Login;
