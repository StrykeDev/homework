import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

interface ILoginProps {
   onLogin: (user: string) => void;
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
      <Container
         className="register-container m-auto p-4 rounded text-center bg-light"
         style={{ width: '20em' }}
      >
         <FontAwesomeIcon icon={faUserCircle} size="10x" className="m-2" />
         <Form onSubmit={handleRegister} className="m-2 d-grid gap-2">
            <Form.Group>
               <Form.Control
                  type="text"
                  placeholder="What are we going to call you?"
                  value={inputName}
                  onChange={(event) => setInputName(event.currentTarget.value)}
               />
            </Form.Group>
            <Button variant="primary" type="submit">
               Save
            </Button>
         </Form>
      </Container>
   );
}

export default Login;
