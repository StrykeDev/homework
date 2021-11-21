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
   faBolt,
   faCode,
   faFont,
   faHandPointLeft,
   faSitemap,
   faStream,
   faWrench,
} from '@fortawesome/free-solid-svg-icons';

import { ECourseType } from '../data/courses';

// Text
function toParagraph(text: string): React.ReactElement[] {
   const lines = text.split('\n');
   return lines.map((line) => {
      return (
         <span key={uuid()}>
            {line}
            <br />
         </span>
      );
   });
}

function toPercentage(number: number): string {
   return Math.floor(number * 100) + '%';
}

export const Text = {
   toParagraph,
   toPercentage,
};

// Icons
function byValue(value: number): IconProp {
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

function byType(type: ECourseType | string): IconProp {
   switch (type) {
      case ECourseType.Types:
         return faFont;
      case ECourseType.Operators:
         return faWrench;
      case ECourseType.Pointers:
         return faHandPointLeft;
      case ECourseType.Objects:
         return faSitemap;
      case ECourseType.Functions:
         return faStream;
      case ECourseType.Events:
         return faBolt;
      default:
         return faCode;
   }
}

export const Icon = {
   byValue,
   byType,
};
