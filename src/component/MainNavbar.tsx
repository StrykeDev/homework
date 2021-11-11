import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { courses, ICourse, ITest, tests } from '../data/courses';

import { INDEX } from '../App';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function MainNavbar(): React.ReactElement {
   return (
      <Navbar bg="light" expand="md" style={{ gridRow: 0 }}>
         <Container>
            <Navbar.Brand as={Link} to={INDEX}>
               <h2 className="d-inline">
                  <FontAwesomeIcon icon={faGraduationCap} /> Homework
               </h2>
               <sup> .NET</sup>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="main-navbar">
               <Nav>
                  <NavDropdown title="Learn" id="learn-dropdown">
                     {courses.map((course: ICourse) => {
                        return (
                           <NavDropdown.Item
                              key={uuid()}
                              as={Link}
                              to={INDEX + '/learn/' + course.id}
                           >
                              {course.name}
                           </NavDropdown.Item>
                        );
                     })}
                  </NavDropdown>
                  <NavDropdown title="Practice" id="practice-dropdown">
                     {tests.map((test: ITest) => {
                        return (
                           <NavDropdown.Item
                              key={uuid()}
                              as={Link}
                              to={INDEX + '/practice/' + test.id}
                           >
                              {test.name}
                           </NavDropdown.Item>
                        );
                     })}
                  </NavDropdown>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default MainNavbar;
