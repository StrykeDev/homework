import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function Error(): React.ReactElement {
   const navigator = useNavigate();

   return (
      <Container className="text-center py-2">
         <div className="my-5">
            <h1 className="display-2">Oops!</h1>
            <h2>Something went wrong!</h2>
         </div>
         <Button
            variant="outline-primary"
            onClick={() => navigator('/homework/')}
         >
            Go back
         </Button>
      </Container>
   );
}

export default Error;
