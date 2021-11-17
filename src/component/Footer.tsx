import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(): React.ReactElement {
   const date = new Date();
   return (
      <footer
         className="bg-normal color-dark disable-select"
         style={{ gridRow: 99 }}
      >
         <div className="container">
            <div className="footer p-1">
               <span>
                  <small>
                     <a href="https://github.com/StrykeDev">
                        StrykeDev <FontAwesomeIcon icon={faGithub} /> GitHub
                     </a>
                     {' | '}
                     <a href="mailto:attias.barak@gmail.com">
                        attias.barak@gmail.com
                     </a>
                  </small>
               </span>
               <small>
                  Barak Attias {date.getFullYear()} &copy; Made In Israel
               </small>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
