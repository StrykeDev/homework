import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { v4 as uuid } from 'uuid';

import {
   tests,
   getTestIndex,
   ITestQuestion,
   ITest,
   updateScore,
} from '../data/courses';

import { text } from '../component/Utilities';

import { Container, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faSadTear,
   faFrown,
   faSmile,
   faSmileWink,
   faSmileBeam,
} from '@fortawesome/free-solid-svg-icons';
import { userContext } from '../App/App';

function Practice(): React.ReactElement {
   const username = useContext(userContext);
   const navigate = useNavigate();
   const params = useParams();
   const [test, setTest] = useState<ITest>();
   const [questions, setQuestions] = useState<[string, number][]>([]);
   const [options, setOptions] = useState<[string, number][]>([]);
   const [testScore, setTestScore] = useState(-1);

   useEffect((): void => {
      if (!params.id) {
         navigate('/');
         return;
      }

      const testIndex = getTestIndex(params.id);
      if (testIndex != -1) {
         const qs: [string, number][] = [];
         const os: [string, number][] = [];
         tests[testIndex].questions.forEach((q: ITestQuestion) => {
            const key = uuid();
            qs.push([key, q.answer]);
            os.push([key, -1]);
         });
         setQuestions(qs);
         setOptions(os);
         setTest(tests[testIndex]);
      } else {
         navigate('/');
         return;
      }
   }, [params]);

   function renderScore(): React.ReactElement {
      let icon: IconProp;
      let message: string;

      if (testScore != -1) {
         if (testScore >= 0.8) {
            icon = faSmileBeam;
            message = 'Great job ' + username + '!!!';
         } else if (testScore == 0.69) {
            icon = faSmileWink;
            message = 'Nice!';
         } else if (testScore >= 0.6) {
            icon = faSmile;
            message = 'Nice!';
         } else if (testScore >= 0.4) {
            icon = faFrown;
            message = 'Could be worse...';
         } else {
            icon = faSadTear;
            message = "Don't worry you'll succeed next time.";
         }

         return (
            <>
               <h1 className="display-4">
                  <FontAwesomeIcon icon={icon} />
                  {' ' + text.toPercentage(testScore)}
               </h1>
               <p>{message}</p>
            </>
         );
      }
      return <p className="display-5">Submit to see your results.</p>;
   }

   function handleCheckChange(event: any, qIndex: number): void {
      const newOptions: [string, number][] = options;
      const o: [string, number] = [
         event.currentTarget.name,
         Number(event.currentTarget.value),
      ];
      newOptions[qIndex] = o;
      setOptions([...newOptions]);
   }

   function handleFormSubmit(event: any): void {
      event.preventDefault();

      let score = 0;
      questions.forEach(([key, value], i) => {
         const checked = event.target[key].value;

         if (checked != '' && checked == value) {
            event.target[key][checked].classList.add('bg-success');
            score++;
         } else if (checked != '') {
            event.target[key][checked].classList.add('bg-danger');
            event.target[key][value].classList.add('bg-success');
         } else {
            event.target[key].forEach((element: any) => {
               element.classList.add('bg-danger');
            });
         }
      });

      score /= questions.length;
      setTestScore(score);

      if (score > 0) {
         test?.topics.forEach((topic) => {
            updateScore({ id: topic, category: test.category, value: score });
         });
      }
   }

   if (test) {
      return (
         <Container className="py-4">
            <h1 className="display-4">{test.title}</h1>
            <p>{text.toParagraph(test.description)}</p>
            <Form onSubmit={handleFormSubmit}>
               <fieldset name="test-field" disabled={testScore != -1}>
                  {test.questions.map(
                     (question: ITestQuestion, qIndex: number) => {
                        const key = questions[qIndex][0];
                        return (
                           <fieldset key={key}>
                              <hr />
                              <h5>{`${qIndex + 1}. ` + question.question}</h5>
                              <p>{question.description}</p>
                              {question.options.map(
                                 (option: string, oIndex: number) => {
                                    return (
                                       <Form.Check
                                          key={key + oIndex}
                                          name={key}
                                          type="radio"
                                          value={oIndex}
                                          checked={options[qIndex][1] == oIndex}
                                          label={
                                             <pre>
                                                <code className="p-0 px-2">
                                                   {option}
                                                </code>
                                             </pre>
                                          }
                                          onChange={(event) =>
                                             handleCheckChange(event, qIndex)
                                          }
                                       />
                                    );
                                 },
                              )}
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
                           </fieldset>
                        );
                     },
                  )}

                  <hr />
                  <div className="text-center">
                     <div id="test-results" className="text-center my-5 py-5">
                        {renderScore()}
                        <Button variant="primary" type="submit">
                           Submit test
                        </Button>
                     </div>
                  </div>
               </fieldset>
            </Form>
         </Container>
      );
   } else {
      return <></>;
   }
}

export default Practice;
