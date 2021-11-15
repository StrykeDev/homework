import React, { useState } from 'react';

import { Container, Form, Button } from 'react-bootstrap';
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
      <Container className="my-5 text-center">
         <div className="my-5 py-5">
            <h1 className="display-4">Welcome to Homework!</h1>
            <h4>Lets get started.</h4>
         </div>
         <div
            className="bg-light rounded p-2 d-inline-block w-100"
            style={{ maxWidth: '25em' }}
         >
            <FontAwesomeIcon icon={faUserCircle} size="10x" className="my-4" />
            <Form onSubmit={handleRegister} className="m-2 d-grid gap-2 ">
               <Form.Group>
                  <Form.Control
                     type="text"
                     placeholder="What are we going to call you?"
                     value={inputName}
                     onChange={(event) =>
                        setInputName(event.currentTarget.value)
                     }
                  />
               </Form.Group>
               <Button variant="primary" type="submit">
                  Start learning
               </Button>
            </Form>
         </div>
      </Container>
   );
}

export default Login;
