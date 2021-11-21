import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import { LocalStorage } from '../../../services/LocalStorage';

import { PATH_INDEX, PATH_LEARN, PATH_PRACTICE } from '../../../utils/constants';

import { ECourseType, getCourses, ICourse } from '../../../data/courses';
import { getTests } from '../../../data/tests';

import '../../../styles/MainNav.css';

function MainNav(): React.ReactElement {
   const [show, setShow] = useState(false);
   const [tab, setTab] = useState(-1);
   const location = useLocation();

   function renderLearnTab() {
      const out: React.ReactElement[] = [];
      const courses = getCourses();

      Object.values(ECourseType).forEach((type) => {
         const listItems: React.ReactElement[] = [];
         const filtered = courses.filter((course: ICourse) => {
            return course.category === type;
         });

         filtered.forEach((course: ICourse) => {
            listItems.push(
               <li key={uuid()}>
                  <Link className={course.available ? '' : 'disabled'} to={PATH_LEARN + course.id}>
                     {course.name}
                  </Link>
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

      Object.values(ECourseType).forEach((type) => {
         const listItems: React.ReactElement[] = [];
         const filtered = tests.filter((test: ICourse) => {
            return test.category === type;
         });

         filtered.forEach((test: ICourse) => {
            listItems.push(
               <li key={uuid()}>
                  <Link className={test.available ? '' : 'disabled'} to={PATH_PRACTICE + test.id}>
                     {test.name}
                  </Link>
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

   const THEME = 'theme';
   const [theme, setTheme] = useState(LocalStorage.getItem(THEME));

   useEffect(() => {
      switch (theme) {
         case 'light':
            document.body.classList.add('light-theme');
            LocalStorage.setItem(THEME, 'light');
            break;

         default:
            document.body.classList.remove('light-theme');
            LocalStorage.setItem(THEME, 'dark');
            break;
      }
   }, [theme]);

   function handleToggleTheme() {
      switch (theme) {
         case 'dark':
            setTheme('light');
            break;

         default:
            setTheme('dark');
            break;
      }
   }

   const FONT = 'font';
   const [font, setFont] = useState(LocalStorage.getItem(FONT));

   useEffect(() => {
      switch (font) {
         case 'large':
            document.body.classList.add('font-large');
            LocalStorage.setItem(FONT, 'large');
            break;

         default:
            document.body.classList.remove('font-large');
            LocalStorage.setItem(FONT, 'normal');
            break;
      }
   }, [font]);

   function handleToggleFont() {
      switch (font) {
         case 'normal':
            setFont('large');
            break;

         default:
            setFont('normal');
            break;
      }
   }

   useEffect(() => {
      document.body.addEventListener('click', (event) => {
         if (!(event.target instanceof HTMLAnchorElement)) {
            setShow(false);
         }
      });
   }, []);

   return (
      <nav
         className={`main-nav ${show ? 'show bg-normal' : ''} ${location.pathname !== PATH_INDEX ? 'bg-normal' : ''}`}
      >
         <div className="container">
            <nav className="nav-items">
               <Link to={PATH_INDEX}>
                  <h4 className="title">
                     <FontAwesomeIcon icon={faGraduationCap} /> Homework
                     <sup> .NET</sup>
                  </h4>
               </Link>
               <a onClick={() => handleTabChange(0)}>Learn</a>
               <a onClick={() => handleTabChange(1)}>Practice</a>
               <a onClick={handleToggleTheme}>Theme</a>
               <a onClick={handleToggleFont}>Font</a>
            </nav>
            <nav className="nav-details">{getTab()}</nav>
         </div>
      </nav>
   );
}

export default MainNav;
