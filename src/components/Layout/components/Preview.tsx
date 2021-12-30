import React from 'react';
import { LocalStorage } from '../../../services/LocalStorage';
import { PREVIEW, PROGRESS, TESTS, PATH_INDEX } from '../../../utils/constants';

function Preview(): React.ReactElement {
   function handleDisablePreview() {
      LocalStorage.setItem(PREVIEW, false);
      LocalStorage.removeItem(PROGRESS);
      LocalStorage.removeItem(TESTS);
      window.location.href = PATH_INDEX;
   }

   return (
      <div className="preview-warning">
         <h6 className="mb-1 color-white">Viewing website in preview mode, progress will be lost!</h6>
         <a className="btn btn-dark" onClick={handleDisablePreview}>
            Disable preview mode to start learning
         </a>
      </div>
   );
}

export default Preview;
