import React from 'react';
import { Navigate, useParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import {
   courses,
   getCourseIndex,
   ICourseSection,
   textToParagraph,
} from '../data/courses';
import ScoreMeter from '../component/ScoreMeter';
import { Container } from 'react-bootstrap';

function Learn(): React.ReactElement {
   const params = useParams();

   if (params.id) {
      const courseIndex = getCourseIndex(params.id);
      if (courseIndex != -1) {
         return (
            <Container className="py-4" key={uuid()}>
               <h1 className="display-4">{courses[courseIndex].title}</h1>
               <p>{textToParagraph(courses[courseIndex].description)}</p>
               {courses[courseIndex].sections.map((section: ICourseSection) => {
                  return (
                     <section key={uuid()}>
                        <hr />
                        <h4>{section.title}</h4>
                        <p>{textToParagraph(section.description)}</p>

                        {section.example ? (
                           <pre>
                              <code>{textToParagraph(section.example)}</code>
                           </pre>
                        ) : (
                           ''
                        )}
                     </section>
                  );
               })}

               <hr />
               <div className="py-4 text-center">
                  <h4>How are we doing?</h4>
                  <ScoreMeter courseIndex={courseIndex} />
               </div>
            </Container>
         );
      }
   }
   return <Navigate to="/homework/error" />;
}

export default Learn;
