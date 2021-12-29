import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import SyntaxHighlighter from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import 'highlight.js/styles/vs2015.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSadTear, faFrown, faSmile, faSmileWink, faSmileBeam } from '@fortawesome/free-solid-svg-icons';

import { userContext } from '../App';

import { PATH_ERROR } from '../utils/constants';
import { Text } from '../utils/utilities';

import { ITestQuestion, getTestDetails, ITestDetails } from '../data/tests';
import { updateScore, updateTestScore } from '../data/Progress';

import { Radio } from '../components/forms/IO';

interface IQuestion {
   selected: number;
   answer: number;
}

/* Fix page redirect when loading failed or invalid params */
function Practice(): React.ReactElement {
   const username = useContext(userContext);
   const params = useParams();
   const navigate = useNavigate();
   const [testDetails, setTestDetails] = useState<ITestDetails>();
   const [questions, setQuestions] = useState<IQuestion[]>([]);
   const [testScore, setTestScore] = useState(-1);
   const [validation, setValidation] = useState(false);

   useEffect((): void => {
      if (params.id) {
         try {
            const test = getTestDetails(params.id);
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
   }, [testDetails, questions, validation]);

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

      if (score >= 0.25 && testDetails) {
         updateTestScore(testDetails.id, score);
         testDetails.subjects.forEach((course) => {
            updateScore(course, score);
         });
      }

      setValidation(true);
   }

   function handleValidation(qIndex: number, oIndex: number): boolean | undefined {
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
            message = 'Pretty good!';
         } else if (testScore >= 0.4) {
            icon = faFrown;
            message = 'Almost there!';
         } else {
            icon = faSadTear;
            message = 'Try again, You can do it!';
         }

         return (
            <>
               <h2>
                  <FontAwesomeIcon icon={icon} />
                  {' ' + Text.toPercentage(testScore)}
               </h2>
               <p>{message}</p>
            </>
         );
      }
      return <p className="display-5">Submit to see your results.</p>;
   }

   if (testDetails && questions) {
      return (
         <div className="container p-1">
            <h2>{testDetails.title}</h2>
            <p>{Text.toParagraph(testDetails.description)}</p>
            <form onSubmit={handleFormSubmit}>
               <fieldset name="test-field" disabled={testScore != -1}>
                  {testDetails.questions.map((question: ITestQuestion, qIndex: number) => {
                     const key = uuid();
                     return (
                        <fieldset key={key}>
                           <hr />
                           <h5>{`${qIndex + 1}. ` + question.question}</h5>
                           <p>{question.description}</p>
                           {question.options.map((option: string, oIndex: number) => {
                              return (
                                 <Radio
                                    key={uuid()}
                                    name={key}
                                    value={oIndex}
                                    checked={questions[qIndex].selected == oIndex}
                                    onChange={() => {
                                       questions[qIndex].selected = oIndex;
                                       setQuestions([...questions]);
                                    }}
                                    validation={handleValidation(qIndex, oIndex)}
                                 >
                                    <pre
                                       className="language-cs"
                                       style={{
                                          maxWidth: '95vw',
                                       }}
                                    >
                                       <code className="bg-dark color-light rounded">{option}</code>
                                    </pre>
                                 </Radio>
                              );
                           })}
                           <div className="text-center">
                              {question.hint ? (
                                 <button
                                    className="btn"
                                    onClick={(e) => {
                                       e.currentTarget.innerText = question.hint || '';
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
                  })}

                  <hr />
                  <div className="text-center">
                     <div id="test-results" className="text-center my-5 py-5">
                        {renderScore()}
                        <input className="btn btn-accent" type="submit" value="Submit test" />
                     </div>
                  </div>
                  <hr className="hide" />
               </fieldset>
            </form>
         </div>
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

export default Practice;
