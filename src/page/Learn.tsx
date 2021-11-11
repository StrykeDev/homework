import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import { v4 as uuid } from 'uuid';

import { courses, getCourseIndex, ICourseSection } from '../data/courses';

import ScoreMeter from '../component/ScoreMeter';

import { text } from '../component/Utilities';

import { Container } from 'react-bootstrap';
import SyntaxHighlighter from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import 'highlight.js/styles/github.css';

function Learn(): React.ReactElement {
   const params = useParams();

   useEffect(() => {
      SyntaxHighlighter.registerLanguage('cs', csharp);
      SyntaxHighlighter.highlightAll();
   }, [params]);

   if (params.id) {
      const courseIndex = getCourseIndex(params.id);
      if (courseIndex != -1) {
         return (
            <Container className="py-4" key={uuid()}>
               <h1 className="display-4">{courses[courseIndex].title}</h1>
               <p>{text.toParagraph(courses[courseIndex].description)}</p>
               {courses[courseIndex].sections.map((section: ICourseSection) => {
                  return (
                     <section key={uuid()}>
                        <hr />
                        <h4>{section.title}</h4>
                        <p>{text.toParagraph(section.description)}</p>

                        {section.example ? (
                           <pre>
                              <code className="bg-light rounded p-2 language-cs">
                                 {section.example}
                              </code>
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
   return <Navigate to="/" />;
}

export default Learn;
