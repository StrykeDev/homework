import React, { useEffect, useState } from 'react';
import { IProgressBar } from '../IO';

import { Text } from '../../../../utils/utilities';

function ProgressCircle({ value, size = 3, showPercentage = true }: IProgressBar): React.ReactElement {
   const [displayValue, setDisplayValue] = useState(0);

   useEffect(() => {
      if (isNaN(value) || displayValue >= value) return;

      const timer = setTimeout(() => {
         setDisplayValue(displayValue + 0.01);
      }, 15);

      return () => {
         clearTimeout(timer);
      };
   }, [displayValue]);

   return (
      <div
         className="io progress"
         style={{
            fontSize: size + 'em',
         }}
      >
         <svg>
            <circle cx={'1em'} cy={'1em'} r={'.8em'} />
            <circle
               className={value > 0 ? '' : 'hide'}
               cx={'1em'}
               cy={'1em'}
               r={'.8em'}
               style={{
                  strokeDashoffset: `calc(5.025em - (5.025em * ${displayValue}))`,
               }}
            />
         </svg>
         <div className="d-flex flex-column align-items-center justify-content-center label">
            <div className={showPercentage ? 'text-center' : 'collapse'}>
               <p>{Text.toPercentage(value || 0)}</p>
            </div>
         </div>
      </div>
   );
}

export default ProgressCircle;
