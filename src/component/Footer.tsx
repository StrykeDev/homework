import React from 'react';

import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(): React.ReactElement {
   const date = new Date();
   return (
      <footer className="bg-light py-4 text-muted" style={{ gridRow: 99 }}>
         <Container className="d-flex justify-content-between align-items-center flex-column flex-md-row">
            <span>
               <small>
                  <a href="https://github.com/StrykeDev">StrykeDev</a>{' '}
                  <FontAwesomeIcon icon={faGithub} /> GitHub |{' '}
                  <a href="mailto:attias.barak@gmail.com">
                     attias.barak@gmail.com
                  </a>{' '}
               </small>
            </span>
            <span>
               <small>Made in Israel</small> &copy;{' '}
               <small>Barak Attias {date.getFullYear()}</small>
            </span>
         </Container>
      </footer>
   );
}

export default Footer;
