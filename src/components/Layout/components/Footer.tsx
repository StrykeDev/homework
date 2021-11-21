import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(): React.ReactElement {
   const date = new Date();
   return (
      <footer className="bg-normal color-dark">
         <div className="container">
            <div className="footer p-1">
               <p>
                  <a href="https://github.com/StrykeDev">
                     StrykeDev <FontAwesomeIcon icon={faGithub} /> GitHub
                  </a>
                  {' | '}
                  <a href="mailto:attias.barak@gmail.com">attias.barak@gmail.com</a>
               </p>
               <p>Barak Attias {date.getFullYear()} &copy; Made In Israel</p>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
