import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSadTear, faFrown, faSmile, faSmileBeam } from '@fortawesome/free-solid-svg-icons';

import { getScore, updateScore } from '../../data/Progress';

const ICONS = [faSadTear, faFrown, faSmile, faSmileBeam];

interface IScoreMeterProps {
   courseId: string;
}

function ScoreSelector({ courseId }: IScoreMeterProps): React.ReactElement {
   const [score, setScore] = useState(getScore(courseId));

   useEffect(() => {
      setScore(getScore(courseId));
   }, [courseId]);

   function handleScoreSelected(value: number): void {
      updateScore(courseId, value);
      setScore(getScore(courseId));
   }

   function renderButtons(): React.ReactElement[] {
      const buttons = ICONS.map((icon: IconProp, index: number) => {
         const className =
            score > index / ICONS.length && score <= (index + 1) / ICONS.length ? 'color-light' : 'color-dark';
         return (
            <button className={className} key={uuid()} onClick={() => handleScoreSelected((index + 1) / ICONS.length)}>
               <FontAwesomeIcon icon={icon} size="3x" />
            </button>
         );
      });
      return buttons;
   }

   return (
      <div className="text-center">
         <h4>How are we doing?</h4>
         <fieldset className="d-flex justify-content-center my-1">{renderButtons()}</fieldset>
         <p className="color-dark">
            Select how you feel about this subject to track your progress.
            <br />
            <small>The score will be set again after completing a test on this subject.</small>
         </p>
      </div>
   );
}

export default ScoreSelector;
