import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(): React.ReactElement {
   const date = new Date();
   return (
      <div className="bg-normal color-dark">
         <footer className="container footer">
            <small>
               <a href="https://github.com/StrykeDev">
                  StrykeDev <FontAwesomeIcon icon={faGithub} /> GitHub
               </a>
               {' | '}
               <a href="mailto:attias.barak@gmail.com">attias.barak@gmail.com</a>
            </small>
            <small>Barak Attias {date.getFullYear()} &copy; Made In Israel</small>
         </footer>
      </div>
   );
}

export default Footer;
