import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faSadTear,
   faFrown,
   faSmile,
   faSmileWink,
   faSmileBeam,
} from '@fortawesome/free-solid-svg-icons';

import { text } from '../component/Utilities';

import { ITestQuestion, getTestDetails, ITestDetails } from '../data/tests';
import { updateScore, updateScoreCategory } from '../data/progress';

import { ERROR, userContext } from '../App/App';
import { Radio } from '../component/Inputs';

interface IQuestion {
   selected: number;
   answer: number;
}

function Practice(): React.ReactElement {
   const username = useContext(userContext);
   const param = useParams();
   const [testDetails, setTestDetails] = useState<ITestDetails>();
   const [questions, setQuestions] = useState<IQuestion[]>([]);
   const [testScore, setTestScore] = useState(-1);
   const [validation, setValidation] = useState(false);

   useEffect((): void => {
      console.log('checking params');

      if (param.id) {
         const test = getTestDetails(param.id);

         if (test) {
            const qs: IQuestion[] = [];
            test.questions.forEach((question: ITestQuestion) => {
               qs.push({
                  selected: -1,
                  answer: question.answer,
               });
            });

            setTestDetails(test);
            setQuestions(qs);
         }
      }
   }, [param]);

   function handleFormSubmit(event: any): void {
      event.preventDefault();

      let score = 0;
      questions.forEach((question) => {
         if (question.selected == question.answer) {
            score++;
         }
      });

      score /= questions.length;
      setTestScore(score);

      if (score > 0 && testDetails) {
         updateScoreCategory(testDetails.category, score);
      }

      setValidation(true);
   }

   function handleValidation(
      qIndex: number,
      oIndex: number,
   ): boolean | undefined {
      if (validation) {
         if (questions[qIndex].selected == -1) {
            return questions[qIndex].answer == oIndex;
         } else if (questions[qIndex].answer == oIndex) {
            return true;
         } else if (questions[qIndex].selected == oIndex) {
            return false;
         }
      }
      return undefined;
   }

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
               <h2>
                  <FontAwesomeIcon icon={icon} />
                  {' ' + text.toPercentage(testScore)}
               </h2>
               <p>{message}</p>
            </>
         );
      }
      return <p className="display-5">Submit to see your results.</p>;
   }

   if (testDetails && questions) {
      return (
         <div className="container">
            <div className="p-1">
               <h2>{testDetails.title}</h2>
               <p>{text.toParagraph(testDetails.description)}</p>
               <form onSubmit={handleFormSubmit}>
                  <fieldset name="test-field" disabled={testScore != -1}>
                     {testDetails.questions.map(
                        (question: ITestQuestion, qIndex: number) => {
                           const key = uuid();
                           return (
                              <fieldset key={key}>
                                 <hr />
                                 <h5>
                                    {`${qIndex + 1}. ` + question.question}
                                 </h5>
                                 <p>{question.description}</p>
                                 {question.options.map(
                                    (option: string, oIndex: number) => {
                                       return (
                                          <Radio
                                             key={uuid()}
                                             name={key}
                                             value={oIndex}
                                             checked={
                                                questions[qIndex].selected ==
                                                oIndex
                                             }
                                             validation={handleValidation(
                                                qIndex,
                                                oIndex,
                                             )}
                                             onChange={(event) => {
                                                questions[qIndex].selected =
                                                   oIndex;
                                                setQuestions([...questions]);
                                             }}
                                          >
                                             <pre>
                                                <code>{option}</code>
                                             </pre>
                                          </Radio>
                                       );
                                    },
                                 )}
                                 <div className="text-right">
                                    {question.hint ? (
                                       <button
                                          className="btn"
                                          onClick={(e) => {
                                             e.currentTarget.innerText =
                                                question.hint || '';
                                             e.currentTarget.disabled = true;
                                          }}
                                       >
                                          Help!
                                       </button>
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
                        <div
                           id="test-results"
                           className="text-center my-5 py-5"
                        >
                           {renderScore()}
                           <input
                              className="btn"
                              type="submit"
                              value="Submit test"
                           />
                        </div>
                     </div>
                     <hr className="hide" />
                  </fieldset>
               </form>
            </div>
         </div>
      );
   } else {
      return (
         <div className="dialog">
            <div className="text-center my-4">Loading test...</div>
         </div>
      );
   }
}

export default Practice;
