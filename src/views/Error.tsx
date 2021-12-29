import React from 'react';
import { useNavigate } from 'react-router';

import { PATH_INDEX } from '../utils/constants';

function Error(): React.ReactElement {
   const navigator = useNavigate();

   return (
      <div className="dialog text-center my-4 py-4">
         <h1>Oops...</h1>
         <h4>Something went wrong!</h4>
         <button className="btn m-1" onClick={() => navigator(PATH_INDEX)}>
            Go back to safety
         </button>
      </div>
   );
}

export default Error;
