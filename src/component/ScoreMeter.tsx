import React from 'react';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faSadTear,
   faFrown,
   faSmile,
   faSmileBeam,
} from '@fortawesome/free-solid-svg-icons';

import { updateScore } from '../data/progress';

const ICONS = [faSadTear, faFrown, faSmile, faSmileBeam];

interface IScoreMeterProps {
   courseId: string;
}

function ScoreMeter({ courseId }: IScoreMeterProps): React.ReactElement {
   function renderButtons(): React.ReactElement[] {
      const buttons = ICONS.map((icon: IconProp, index: number) => {
         return (
            <button
               key={uuid()}
               onClick={() => handleScoreSelected((index + 1) / ICONS.length)}
            >
               <FontAwesomeIcon icon={icon} size="3x" />
            </button>
         );
      });
      return buttons;
   }

   function handleScoreSelected(value: number): void {
      if (value >= 0 && value <= 1) {
         updateScore(courseId, value);
      }
   }

   return (
      <div className="text-center">
         <h4>How are we doing?</h4>
         <fieldset>{renderButtons()}</fieldset>
         <p className="color-dark py-1">
            Select how you feel about this subject to track your progress.
            <br />
            <small>
               The score will be set again after completing a test on this
               subject.
            </small>
         </p>
      </div>
   );
}

export default ScoreMeter;
