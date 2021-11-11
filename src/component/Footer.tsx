import React from 'react';

import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(): React.ReactElement {
   const date = new Date();
   return (
      <footer className="bg-light py-4 text-muted" style={{ gridRow: 99 }}>
         <Container className="d-flex justify-content-between">
            <span>
               <small>Barak Attias</small> &copy;{' '}
               <small>2021-{date.getFullYear()}</small>
            </span>
            <span>
               <small>
                  <a href="mailto:attias.barak@gmail.com">
                     attias.barak@gmail.com
                  </a>{' '}
                  | <a href="https://github.com/StrykeDev">StrykeDev</a>{' '}
                  <FontAwesomeIcon icon={faGithub} /> GitHub{' '}
               </small>
            </span>
         </Container>
      </footer>
   );
}

export default Footer;
