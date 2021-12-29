import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ProgressCircle } from '../components/forms/IO';

import { PATH_LEARN, PATH_PRACTICE } from '../utils/constants';
import { Icon } from '../utils/utilities';

import { ECourseType, getCourses, ICourse } from '../data/courses';
import { getTests } from '../data/tests';
import { getProgressOverall, getProgressSummary, getTestScore } from '../data/Progress';

import { userContext } from '../App';

import '../styles/Home.css';

function Home(): React.ReactElement {
   const user = useContext(userContext);

   function renderPracticeCards(): React.ReactElement[] {
      const out: React.ReactElement[] = [];
      const tests = getTests();

      tests.forEach((test) => {
         const testScore = getTestScore(test.id);
         out.push(
            <Link
               key={uuid()}
               className={
                  test.available
                     ? 'btn bg-normal m-0 p-1 d-flex align-items-center justify-content-between'
                     : 'btn bg-normal m-0 p-1 d-flex align-items-center justify-content-between disabled'
               }
               to={PATH_PRACTICE + test.id}
            >
               <span>
                  <h5>{test.category}</h5>
                  <p>{test.name}</p>
               </span>
               <FontAwesomeIcon icon={Icon.byValue(testScore?.value || 0)} size="3x" />
            </Link>,
         );
      });

      return out;
   }

   function renderLearnCards(): React.ReactElement[] {
      const out: React.ReactElement[] = [];
      const courses = getCourses();

      Object.values(ECourseType).forEach((type: string) => {
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
            <div key={uuid()} className="bg-normal rounded m-0 p-1">
               <h5 className="d-flex justify-content-between">
                  {type}
                  <FontAwesomeIcon icon={Icon.byType(type)} />
               </h5>
               <ul className="list-unstyled">{listItems}</ul>
            </div>,
         );
      });

      return out;
   }

   return (
      <div className="container p-1">
         <header className="home-header">
            <div>
               <div className="my-4">
                  <h1>Hi {user || 'Visitor'}!</h1>
                  <h4>What are we learning today?</h4>
               </div>
               <div className="progress-deck">
                  {Array.from(getProgressSummary()).map(([key, value]) => {
                     return (
                        <div key={uuid()} className="progress-card">
                           <h5>{key}</h5>
                           <ProgressCircle value={value} />
                        </div>
                     );
                  })}
               </div>
            </div>

            <div className="progress-overview">
               <div className="circle bg-light">
                  <ProgressCircle value={getProgressOverall()} size={16} />
               </div>
            </div>
         </header>
         <hr className="hide" />
         <section>
            <h3 className="text-center my-1">Practice</h3>
            <div className="deck">{renderPracticeCards()}</div>
         </section>
         <hr className="hide" />
         <section>
            <h3 className="text-center my-1">Learn</h3>
            <div className="deck">{renderLearnCards()}</div>
         </section>
         <hr className="hide" />
      </div>
   );
}

export default Home;
