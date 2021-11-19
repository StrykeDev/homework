import React from 'react';

import { text } from './Utilities';

interface IInput {
   name: string;
   value: number;
   onChange: (event: any) => void;
   children: React.ReactElement | string;
   validation?: boolean | undefined;
}

interface IInputRadio extends IInput {
   checked: boolean;
}

function getState(className: string, validation: boolean | undefined): string {
   switch (validation) {
      case true:
         return className + ' valid';
      case false:
         return className + ' invalid';
      default:
         return className;
   }
}

export function Radio({
   name,
   checked,
   children,
   value,
   validation,
   onChange,
}: IInputRadio): React.ReactElement {
   return (
      <label className="radio-wrapper">
         <input
            type="radio"
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
         />
         <span className={getState('radio', validation)} />
         {children}
      </label>
   );
}

interface IProgress {
   value: number;
   size?: number;
   thickness?: number;
   showValue?: boolean;
   innerText?: string;
}

export function ProgressCircle({
   value,
   size = 48,
   thickness = 16,
   showValue = true,
   innerText = '',
}: IProgress): React.ReactElement {
   return (
      <div
         style={{
            position: 'relative',
            width: size * 2,
            height: size * 2,
         }}
      >
         <svg style={{ height: '100%', width: '100%' }}>
            <circle
               cx={size - thickness / 2}
               cy={size - thickness / 2}
               r={size - thickness / 2}
               style={{
                  fill: 'none',
                  stroke:
                     value < 1 ? 'var(--btn-normal)' : 'var(--accent-color)',
                  transform: `translate(${thickness / 2}px,${thickness / 2}px)`,
                  strokeWidth: thickness,
               }}
            />
            <circle
               className={value > 0 && value < 1 ? '' : 'hide'}
               cx={size - thickness / 2}
               cy={size - thickness / 2}
               r={size - thickness / 2}
               style={{
                  fill: 'none',
                  stroke: 'var(--accent-color)',
                  transform: `translate(${thickness / 2}px,${thickness / 2}px)`,
                  strokeWidth: thickness,
                  strokeLinecap: 'round',
                  strokeDasharray: size * 5.25,
                  strokeDashoffset: `calc(${size * 5.25} - (${size * 5.25} * ${
                     value * 100
                  }) / 100)`,
               }}
            />
         </svg>
         <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
               fontSize: thickness,
               position: 'absolute',
               height: '100%',
               width: '100%',
               top: 0,
               left: 0,
            }}
         >
            <h6 className={innerText ? '' : 'collapse'}>{innerText}</h6>
            <span className={showValue ? '' : 'collapse'}>
               {text.toPercentage(value)}
            </span>
         </div>
      </div>
   );
}
