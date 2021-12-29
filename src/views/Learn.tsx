import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import SyntaxHighlighter from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import 'highlight.js/styles/vs2015.css';

import ScoreSelector from '../components/forms/ScoreSelector';

import { Text } from '../utils/utilities';
import { PATH_ERROR } from '../utils/constants';

import { getCourseDetails, ICourseDetails, ICourseSection } from '../data/courses';

function Learn(): React.ReactElement {
   const params = useParams();
   const navigate = useNavigate();
   const [course, setCourse] = useState<ICourseDetails>();

   useEffect(() => {
      if (params.id) {
         try {
            const c = getCourseDetails(params.id);
            setCourse(c);
         } catch (error) {
            navigate(PATH_ERROR);
         }
      } else {
         navigate(PATH_ERROR);
      }
   }, [params]);

   useEffect(() => {
      SyntaxHighlighter.registerLanguage('cs', csharp);
      SyntaxHighlighter.highlightAll();
   }, [course]);

   if (course) {
      return (
         <article className="container p-1">
            <h2>{course.title}</h2>
            <p>{Text.toParagraph(course.description)}</p>
            {course.sections.map((section: ICourseSection) => {
               return (
                  <section key={uuid()}>
                     <hr />
                     <h3>{section.title}</h3>
                     <p>{Text.toParagraph(section.description)}</p>

                     {section.example ? (
                        <pre className="language-cs" style={{ maxWidth: '95vw' }}>
                           <code className="bg-normal color-light rounded">{section.example}</code>
                        </pre>
                     ) : (
                        ''
                     )}
                  </section>
               );
            })}

            <hr />
            <ScoreSelector courseId={course.id} />
            <hr className="hide" />
         </article>
      );
   } else {
      return (
         <div className="dialog text-center my-4 py-4">
            <h2>Loading...</h2>
            <p>Please wait.</p>
         </div>
      );
   }
}

export default Learn;
