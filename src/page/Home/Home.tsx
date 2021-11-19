import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getIconByValue } from '../../component/Utilities';
import { ProgressCircle } from '../../component/Inputs';

import {
   ECourseType,
   getCourses,
   getIconByType,
   ICourse,
} from '../../data/courses';
import { getTests } from '../../data/tests';
import {
   getProgressSummery,
   getProgressSummeryOverall,
   getTestScore,
   IProgressSummery,
} from '../../data/progress';

import { PATH_INDEX, userContext } from '../../App';

import './Home.css';

function Home(): React.ReactElement {
   const user = useContext(userContext);

   function renderStats(): React.ReactElement[] {
      const out = getProgressSummery().map((item: IProgressSummery) => {
         return (
            <div key={uuid()} className="progress-card">
               <h5>{item.category}</h5>
               <ProgressCircle value={item.value} />
            </div>
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
                  <Link to={PATH_INDEX + '/learn/' + course.id}>
                     {course.name}
                  </Link>
               </li>,
            );
         });

         out.push(
            <div key={uuid()} className="bg-normal rounded p-1">
               <h5 className="d-flex justify-content-between">
                  {type}
                  <FontAwesomeIcon icon={getIconByType(type)} />
               </h5>
               <ul className="list-unstyled">{listItems}</ul>
            </div>,
         );
      });

      return out;
   }

   function renderPracticeCards(): React.ReactElement[] {
      const out: React.ReactElement[] = [];
      const tests = getTests();

      tests.forEach((test) => {
         const testScore = getTestScore(test.id);
         out.push(
            <Link
               key={uuid()}
               className="btn bg-normal m-0 p-1 d-flex align-items-center justify-content-between"
               to={PATH_INDEX + '/practice/' + test.id}
            >
               <span>
                  <h5>{test.category}</h5>
                  <p>{test.name}</p>
               </span>
               <FontAwesomeIcon
                  icon={getIconByValue(testScore?.value || 0)}
                  size="3x"
               />
            </Link>,
         );
      });

      return out;
   }

   return (
      <div className="container">
         <div className="p-1">
            <header className="home-header">
               <div>
                  <div className="my-4">
                     <h1>Hi {user}!</h1>
                     <h4>What are we learning today?</h4>
                  </div>
                  <div className="progress-deck">{renderStats()}</div>
               </div>

               <div className="progress-overview">
                  <div className="circle bg-light">
                     <ProgressCircle
                        value={getProgressSummeryOverall()}
                        size={275}
                        thickness={16 * 5}
                     />
                  </div>
               </div>
            </header>
            <hr className="hide" />
            <section>
               <h3 className="text-center my-1">Practice</h3>
               <div className="practice-deck">{renderPracticeCards()}</div>
            </section>
            <hr className="hide" />
            <section>
               <h3 className="text-center my-1">Learn</h3>
               <div className="learn-deck">{renderLearnCards()}</div>
            </section>
            <hr className="hide" />
         </div>
      </div>
   );
}

export default Home;
