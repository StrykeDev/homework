import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { userContext } from '../App';

function Profile(): React.ReactElement {
   const user = useContext(userContext);

   return (
      <div className="my-2 text-center">
         <div className="dialog bg-normal rounded">
            <div className="p-2">
               <FontAwesomeIcon icon={faUserCircle} size="10x" />
               <h1>Hi {user}</h1>
            </div>
         </div>
      </div>
   );
}

export default Profile;
