import React from 'react';
import { v4 as uuid } from 'uuid';

import { courses, updateScore } from '../data/courses';

import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faSadTear,
   faFrown,
   faSmile,
   faSmileBeam,
} from '@fortawesome/free-solid-svg-icons';

const ICONS = [faSadTear, faFrown, faSmile, faSmileBeam];

interface IScoreMeterProps {
   courseIndex: number;
}

function ScoreMeter({ courseIndex }: IScoreMeterProps): React.ReactElement {
   function handleScoreSelected(value: number): void {
      if (value >= 0 && value <= 1) {
         const newScore = {
            id: courses[courseIndex].id,
            category: courses[courseIndex].category,
            value: value,
         };
         updateScore(newScore);
      }
   }

   function renderButtons(): React.ReactElement[] {
      const buttons = ICONS.map((icon: IconProp, index: number) => {
         return (
            <Button
               key={uuid()}
               variant="none"
               type="button"
               onClick={() => handleScoreSelected((index + 1) / ICONS.length)}
            >
               <FontAwesomeIcon icon={icon} size="3x" />
            </Button>
         );
      });
      return buttons;
   }

   return (
      <Form className="text-center">
         <h4>How are we doing?</h4>
         <Form.Group className="d-inline-flex">{renderButtons()}</Form.Group>
         <p className="text-muted pt-2">
            Select how you feel about this subject to track your progress.
            <br />
            <sub>
               The score will be set again after completing a test on this
               subject.
            </sub>
         </p>
      </Form>
   );
}

export default ScoreMeter;
