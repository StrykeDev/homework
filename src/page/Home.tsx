import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { userContext } from '../App';
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
         const badge = <Badge bg="dark">{Math.floor(info * 100) + '%'}</Badge>;
         return React.createElement(ListGroup.Item, props, name, badge);
      } else {
         return React.createElement(ListGroup.Item, props, name);
      }
   }

   return (
      <Container>
         {/* Header */}
         <div className="text-center px-2 p-5">
            <h1 className="display-2">Hi {user}</h1>
            <h2>What are we doing today?</h2>
         </div>

         <div className="row gap-4">
            <Panel icon={faBookReader} title="Learn">
               <ListGroup className="pb-2">
                  {courses.map((course: ICourse) => {
                     return renderListItem(
                        course.name,
                        '/homework/learn/' + course.id,
                     );
                  })}
               </ListGroup>
            </Panel>

            <Panel icon={faUserEdit} title="Practice">
               <ListGroup className="pb-2">
                  {tests.map((test: ITest) => {
                     return renderListItem(
                        test.name,
                        '/homework/practice/' + test.id,
                     );
                  })}
               </ListGroup>
            </Panel>

            <Panel icon={faChalkboardTeacher} title="Progress">
               <ListGroup className="pb-2">
                  {getProgressSummery().map((item: IScoreSummery) => {
                     return renderListItem(
                        item.category,
                        undefined,
                        item.score,
                     );
                  })}
               </ListGroup>
            </Panel>
         </div>
      </Container>
   );
}

export interface IPanelProps {
   icon: IconProp;
   title: string;
   children: React.ReactElement;
}

export function Panel({
   icon,
   title,
   children,
}: IPanelProps): React.ReactElement {
   return (
      <div className="bg-light col rounded">
         <div className="text-center pb-2 pt-4">
            <FontAwesomeIcon icon={icon} size="3x" />
            <h4>{title}</h4>
         </div>
         {children}
      </div>
   );
}

export default Home;
