import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import SyntaxHighlighter from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import 'highlight.js/styles/github.css';

import { getCourseDetails, ICourseSection } from '../data/courses';

import ScoreMeter from '../component/ScoreMeter';
import { text } from '../component/Utilities';

import { ERROR } from '../App/App';

function Learn(): React.ReactElement {
   const params = useParams();

   useEffect(() => {
      SyntaxHighlighter.registerLanguage('cs', csharp);
      SyntaxHighlighter.highlightAll();
   }, [params]);

   if (params.id) {
      const course = getCourseDetails(params.id);
      if (course) {
         return (
            <div className="container">
               <article className="p-1">
                  <h2>{course.title}</h2>
                  <p>{text.toParagraph(course.description)}</p>
                  {course.sections.map((section: ICourseSection) => {
                     return (
                        <section key={uuid()}>
                           <hr />
                           <h3>{section.title}</h3>
                           <p>{text.toParagraph(section.description)}</p>

                           {section.example ? (
                              <pre
                                 className="language-cs"
                                 style={{ maxWidth: '95vw' }}
                              >
                                 <code className="bg-white color-black rounded">
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
                  <ScoreMeter courseId={course.id} />
                  <hr className="hide" />
               </article>
            </div>
         );
      }
   }
   return <Navigate to={ERROR} />;
}

export default Learn;
