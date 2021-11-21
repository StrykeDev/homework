import React, { useEffect, useState } from 'react';
import { IProgressBar } from '../IO';

import { Text } from '../../../../utils/utilities';

function ProgressCircle({
   value,
   size = 3,
   thickness = 1,
   showPercentage = true,
   label,
}: IProgressBar): React.ReactElement {
   const [displayValue, setDisplayValue] = useState(0);

   useEffect(() => {
      if (isNaN(value) || displayValue >= value) return;

      const timer = setInterval(() => {
         setDisplayValue(displayValue + 0.01);
      }, 15);

      return () => {
         clearInterval(timer);
      };
   }, [displayValue]);

   return (
      <div
         className="io progress"
         style={{
            width: size * 2 + 'em',
            height: size * 2 + 'em',
         }}
      >
         <svg>
            <circle
               cx={size - thickness / 2 + 'em'}
               cy={size - thickness / 2 + 'em'}
               r={size - thickness / 2 + 'em'}
               style={{
                  strokeWidth: thickness + 'em',
                  transform: `translate(${thickness / 2}em,${thickness / 2}em)`,
                  stroke: displayValue < 1 ? 'var(--btn-normal)' : 'var(--accent-color)',
               }}
            />
            <circle
               className={displayValue > 0 && displayValue < 1 ? '' : 'hide'}
               cx={size - thickness / 2 + 'em'}
               cy={size - thickness / 2 + 'em'}
               r={size - thickness / 2 + 'em'}
               style={{
                  strokeWidth: thickness + 'em',
                  transform: `translate(${thickness / 2}em,${thickness / 2}em)`,
                  strokeDasharray: size * 5.25 + 'em',
                  strokeDashoffset: `calc(${size * 5.25}em - (${size * 5.25}em * ${displayValue}))`,
               }}
            />
         </svg>
         <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
               fontSize: thickness + 'em',
               position: 'absolute',
               height: '100%',
               width: '100%',
               top: 0,
               left: 0,
            }}
         >
            <span className={showPercentage ? 'text-center' : 'collapse'}>
               <h5>{label}</h5>
               {Text.toPercentage(value || 0)}
            </span>
         </div>
      </div>
   );
}

export default ProgressCircle;
