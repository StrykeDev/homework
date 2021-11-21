import React from 'react';

import { LocalStorage } from '../services/LocalStorage';

import { PATH_INDEX, PREVIEW, PROGRESS, TESTS } from '../utils/constants';

function Preview(): React.ReactElement {
   function handleDisablePreview() {
      LocalStorage.setItem(PREVIEW, false);
      LocalStorage.removeItem(PROGRESS);
      LocalStorage.removeItem(TESTS);
      window.location.href = PATH_INDEX;
   }

   return (
      <div className="preview-warning">
         <h6>Viewing website in preview mode, progress will be lost!</h6>
         <a className="btn" onClick={handleDisablePreview}>
            Disable preview mode
         </a>
      </div>
   );
}

export default Preview;
