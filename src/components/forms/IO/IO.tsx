import React from 'react';
import Radio from './components/Radio';
import ProgressCircle from './components/ProgressCircle';

import '../../../styles/IO.css';

export interface IInput {
   name?: string;
   value: number;
   children?: React.ReactElement | string;
   validation?: boolean | undefined;
}

export interface IButton extends IInput {
   onClick: (event: any) => void;
}

export interface IRadio extends IInput {
   checked: boolean;
   onChange: (event: any) => void;
}

export interface IProgressBar extends IInput {
   value: number;
   size?: number;
   thickness?: number;
   showPercentage?: boolean;
   label?: string;
}

export function validate(className: string, validate: boolean | undefined): string {
   switch (validate) {
      case true:
         return className + ' valid';
      case false:
         return className + ' invalid';
      default:
         return className;
   }
}

export { Radio, ProgressCircle };
