import React from 'react';
import { v4 as uuid } from 'uuid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faSmileBeam,
   faSmileWink,
   faSmile,
   faFrown,
   faSadTear,
   faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

import { ID } from '../App';

export const storage = {
   get: function (key: string): string {
      return window.localStorage.getItem(ID + '.' + key) || '';
   },
   set: function (key: string, value: string): void {
      window.localStorage.setItem(ID + '.' + key, value);
   },
};

export const text = {
   toPercentage: function (number: number) {
      return Math.floor(number * 100) + '%';
   },
   toParagraph: function (text: string): React.ReactElement[] {
      const lines = text.split('\n');
      return lines.map((line) => {
         return (
            <span key={uuid()}>
               {line}
               <br />
            </span>
         );
      });
   },
};

export function getIconByValue(value: number): IconProp {
   if (value >= 0.8) {
      return faSmileBeam;
   } else if (value == 0.69) {
      return faSmileWink;
   } else if (value >= 0.6) {
      return faSmile;
   } else if (value >= 0.4) {
      return faFrown;
   } else if (value > 0) {
      return faSadTear;
   }
   return faQuestionCircle;
}
