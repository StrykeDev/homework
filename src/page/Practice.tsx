import React from 'react';
import { Navigate, useParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import {
   tests,
   getTestIndex,
   ITestQuestion,
   textToParagraph,
} from '../data/courses';
import { Container, Button, Form } from 'react-bootstrap';

function Practice(): React.ReactElement {
   const params = useParams();

   function renderHint(hint: string) {
      const id = uuid();
      return (
         <>
            <a onClick={(e) => (e.currentTarget.innerText = hint)}>
               I need a hint!
            </a>
         </>
      );
   }

   if (params.id) {
      const testIndex = getTestIndex(params.id);
      if (testIndex != -1) {
         return (
            <Container className="py-4">
               <h1 className="display-4">{tests[testIndex].title}</h1>
               <p>{textToParagraph(tests[testIndex].description)}</p>
               {tests[testIndex].questions.map(
                  (question: ITestQuestion, index: number) => {
                     return (
                        <section key={uuid()}>
                           <hr />
                           <h5>{`${index + 1}. ` + question.question}</h5>
                           <p>{question.description}</p>
                           <Form className="px-4">
                              {question.options.map(
                                 (option: string, index: number) => {
                                    return (
                                       <Form.Check
                                          key={uuid()}
                                          label={
                                             <pre>
                                                <code>{option}</code>
                                             </pre>
                                          }
                                          name={question.question}
                                          type="radio"
                                          value={index}
                                       />
                                    );
                                 },
                              )}
                           </Form>
                           <div className="text-right">
                              {question.hint ? (
                                 <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={(e) => {
                                       e.currentTarget.innerText =
                                          question.hint || '';
                                       e.currentTarget.disabled = true;
                                    }}
                                 >
                                    Help!
                                 </Button>
                              ) : (
                                 ''
                              )}
                           </div>
                        </section>
                     );
                  },
               )}

               <hr />
               <div className="py-4 text-center">
                  <h4>Well, thats it.</h4>
                  <Button variant="primary" type="button">
                     Submit test
                  </Button>
               </div>
            </Container>
         );
      }
   }
   return <Navigate to="/homework/error" />;
}

export default Practice;
