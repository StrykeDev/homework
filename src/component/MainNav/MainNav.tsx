import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import { ECourseType, getCourses, ICourse } from '../../data/courses';
import { getTests } from '../../data/tests';

import { INDEX } from '../../App';

import './MainNav.css';

function MainNav(): React.ReactElement {
   const [show, setShow] = useState(false);
   const [tab, setTab] = useState(-1);
   const location = useLocation();

   function renderLearnTab() {
      const out: React.ReactElement[] = [];
      const courses = getCourses();

      Object.keys(ECourseType).forEach((type) => {
         const listItems: React.ReactElement[] = [];
         const filtered = courses.filter((course: ICourse) => {
            return course.category === type;
         });

         filtered.forEach((course: ICourse) => {
            listItems.push(
               <li key={uuid()}>
                  <Link to={INDEX + '/learn/' + course.id}>{course.name}</Link>
               </li>,
            );
         });

         out.push(
            <div key={uuid()}>
               <h5>{type}</h5>
               <ul className="list-unstyled">{listItems}</ul>
            </div>,
         );
      });

      return out;
   }

   function renderPracticeTab() {
      const out: React.ReactElement[] = [];
      const tests = getTests();

      Object.keys(ECourseType).forEach((type) => {
         const listItems: React.ReactElement[] = [];
         const filtered = tests.filter((test: ICourse) => {
            return test.category === type;
         });

         filtered.forEach((test: ICourse) => {
            listItems.push(
               <li key={uuid()}>
                  <Link to={INDEX + '/practice/' + test.id}>{test.name}</Link>
               </li>,
            );
         });

         out.push(
            <div key={uuid()}>
               <h5>{type}</h5>
               <ul className="list-unstyled">{listItems}</ul>
            </div>,
         );
      });

      return out;
   }

   function getTab(): React.ReactElement {
      switch (tab) {
         case 0:
            return <div className="drop-list">{renderLearnTab()}</div>;
         case 1:
            return <div className="drop-list">{renderPracticeTab()}</div>;
         default:
            return <div></div>;
      }
   }

   function handleTabChange(newTab: number) {
      if (tab != newTab) {
         setTab(newTab);
         setShow(true);
      } else {
         setShow(!show);
      }
   }

   return (
      <nav
         className={`main-nav disable-select ${show ? 'show bg-normal' : ''} ${
            location.pathname !== INDEX ? 'bg-normal' : ''
         }`}
      >
         <div className="container">
            <nav className="nav-items">
               <Link to={INDEX}>
                  <h4 className="title">
                     <FontAwesomeIcon icon={faGraduationCap} /> Homework
                     <sup> .NET</sup>
                  </h4>
               </Link>
               <a onClick={() => handleTabChange(0)}>Learn</a>
               <a onClick={() => handleTabChange(1)}>Practice</a>
            </nav>
            <nav className="nav-details">{getTab()}</nav>
         </div>
      </nav>
   );
}

export default MainNav;
