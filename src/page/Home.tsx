import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { INDEX, userContext } from '../App';

import { text } from '../component/Utilities';

import {
   courses,
   getProgressSummery,
   ICourse,
   IScoreSummery,
   ITest,
   tests,
} from '../data/courses';

import { Badge, Container, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faBookReader,
   faChalkboardTeacher,
   faUserEdit,
} from '@fortawesome/free-solid-svg-icons';

function Home(): React.ReactElement {
   const user = useContext(userContext);

   function renderPanel(
      icon: IconProp,
      title: string,
      content: React.ReactElement,
   ): React.ReactElement {
      return (
         <div className="bg-light col-lg rounded m-3">
            <div className="text-center pb-2 pt-4">
               <FontAwesomeIcon icon={icon} size="3x" className="m-2" />
               <h5>{title}</h5>
            </div>
            {content}
         </div>
      );
   }

   function renderListItem(
      name: string,
      path = '',
      info = -1,
   ): React.ReactElement {
      let props: any = {
         key: uuid(),
         className: 'p-1 d-flex justify-content-between align-items-center',
      };

      if (path) {
         props = { ...props, action: true, as: Link, to: path };
      }

      if (info != -1) {
         const badge = <Badge bg="dark">{text.toPercentage(info)}</Badge>;
         return React.createElement(ListGroup.Item, props, name, badge);
      } else {
         return React.createElement(ListGroup.Item, props, name);
      }
   }

   return (
      <Container>
         {/* Header */}
         <div className="text-center px-2 p-5">
            <h1 className="display-4">Hi {user}</h1>
            <h4>What are we doing today?</h4>
         </div>

         <div className="row">
            {renderPanel(
               faChalkboardTeacher,
               'Progress',
               <ListGroup className="pb-2">
                  {getProgressSummery().map((item: IScoreSummery) => {
                     return renderListItem(
                        item.category,
                        undefined,
                        item.score,
                     );
                  })}
               </ListGroup>,
            )}

            {renderPanel(
               faBookReader,
               'Learn',
               <ListGroup className="pb-2">
                  {courses.map((course: ICourse) => {
                     return renderListItem(
                        course.name,
                        INDEX + '/learn/' + course.id,
                     );
                  })}
               </ListGroup>,
            )}

            {renderPanel(
               faUserEdit,
               'Practice',
               <ListGroup className="pb-2">
                  {tests.map((test: ITest) => {
                     return renderListItem(
                        test.name,
                        INDEX + '/practice/' + test.id,
                     );
                  })}
               </ListGroup>,
            )}
         </div>
      </Container>
   );
}

export default Home;
