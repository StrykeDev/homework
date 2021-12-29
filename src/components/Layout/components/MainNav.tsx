import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBrush, faFont, faGraduationCap, faPaintBrush } from '@fortawesome/free-solid-svg-icons';

import { PATH_INDEX, PATH_LEARN, PATH_PRACTICE } from '../../../utils/constants';

import { ThemeColorContext, ThemeFontContext } from '../../../data/ThemeContext';
import { ECourseType, getCourses, ICourse } from '../../../data/courses';
import { getTests } from '../../../data/tests';

import '../../../styles/MainNav.css';

function MainNav(): React.ReactElement {
   const location = useLocation();
   const { toggleColor } = useContext(ThemeColorContext);
   const { toggleFont } = useContext(ThemeFontContext);
   const [background, setBackground] = useState(true);
   const [scroll, setScroll] = useState(window.scrollY > 10);
   const [open, setOpen] = useState(false);
   const [tab, setTab] = useState(-2);

   useEffect(() => {
      document.body.addEventListener('click', (event) => {
         if (event.target instanceof HTMLAnchorElement) {
            const target = event.target as HTMLAnchorElement;
            if (target.classList.contains('nav-link')) {
               return;
            }
         }
         setOpen(false);
      });

      window.addEventListener('scroll', () => {
         setScroll(window.scrollY > 10);
      });

      window.addEventListener('resize', () => {
         setOpen(false);
      });
   }, []);

   // Tabs
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

   function renderTabs(): React.ReactElement {
      switch (tab) {
         case -1:
            return (
               <div className="nav-details-items">
                  <div className="d-flex justify-content-center">
                     <a className="text-center mx-2" onClick={() => toggleColor()}>
                        <h2>
                           <FontAwesomeIcon icon={faPaintBrush} />
                        </h2>
                        <p>Theme</p>
                     </a>
                     <a className="text-center mx-2" onClick={() => toggleFont()}>
                        <h2>
                           <FontAwesomeIcon icon={faFont} />
                        </h2>
                        <p>Font</p>
                     </a>
                  </div>
                  <hr className="my-2" />
                  <div>
                     <h3 className="text-center">Learn</h3>
                     {renderLearnTab()}
                  </div>
                  <hr className="my-2" />
                  <div>
                     <h3 className="text-center">Practice</h3>
                     {renderPracticeTab()}
                  </div>
               </div>
            );
         case 0:
            return <div className="nav-details-items">{renderLearnTab()}</div>;
         case 1:
            return <div className="nav-details-items">{renderPracticeTab()}</div>;
         default:
            return <div></div>;
      }
   }

   function handleTabChange(newTab: number) {
      if (tab != newTab) {
         setTab(newTab);
         setOpen(true);
      } else {
         setOpen(!open);
      }
   }

   // Nav open
   const nav = useRef<HTMLDivElement>(null);

   useEffect(() => {
      nav.current?.classList.add('open-details-active');

      const handle = setTimeout(() => {
         nav.current?.classList.remove('open-details-active');
      }, 500);

      if (open) {
         nav.current?.classList.add('open-details');
      } else {
         nav.current?.classList.remove('open-details');
      }

      return () => {
         clearTimeout(handle);
      };
   }, [open]);

   useEffect(() => {
      if (location.pathname === PATH_INDEX && !open && !scroll) {
         setBackground(false);
      } else {
         setBackground(true);
      }
   }, [location, open, scroll]);

   useEffect(() => {
      nav.current?.classList.add('open-details-active');
      const handle = setTimeout(() => {
         nav.current?.classList.remove('open-details-active');
      }, 500);

      if (background) {
         nav.current?.classList.add('bg-normal');
      } else {
         nav.current?.classList.remove('bg-normal');
      }

      return () => {
         clearTimeout(handle);
      };
   }, [background]);

   return (
      <div className="main-nav">
         <div ref={nav} className="nav">
            <div className="container">
               <div className="nav-items">
                  <Link to={PATH_INDEX} className="title">
                     <h4>
                        <FontAwesomeIcon icon={faGraduationCap} /> Homework
                        <sup> .NET</sup>
                     </h4>
                  </Link>
                  <a className="nav-link" onClick={() => handleTabChange(0)}>
                     Learn
                  </a>
                  <a className="nav-link" onClick={() => handleTabChange(1)}>
                     Practice
                  </a>
                  <a className="nav-link" onClick={() => toggleColor()}>
                     Theme
                  </a>
                  <a className="nav-link" onClick={() => toggleFont()}>
                     Font
                  </a>
                  <a className="nav-link nav-menu ml-auto" onClick={() => handleTabChange(-1)}>
                     <h4>
                        <FontAwesomeIcon icon={faBars} />
                     </h4>
                  </a>
               </div>
               <div className="nav-details">{renderTabs()}</div>
            </div>
         </div>
      </div>
   );
}

export default MainNav;
