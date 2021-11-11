import React from 'react';
import { useNavigate } from 'react-router';

import { INDEX } from '../App/App';

import { Container, Button } from 'react-bootstrap';

function Error(): React.ReactElement {
   const navigator = useNavigate();

   return (
      <Container className="my-5 text-center">
         <div className="py-5">
            <h1 className="display-4">Oops!</h1>
            <h4>Something went wrong!</h4>
            <Button
               className="mt-4"
               variant="outline-primary"
               onClick={() => navigator(INDEX)}
            >
               Go back to safety
            </Button>
         </div>
      </Container>
   );
}

export default Error;
