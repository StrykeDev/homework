import React from 'react';
import { IRadio, validate } from '../IO';

function Radio({
   name,
   checked,
   children,
   value,
   validation,
   onChange,
}: IRadio): React.ReactElement {
   return (
      <label className="io radio">
         <input
            type="radio"
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
         />
         <span className={validate('radio-dot', validation)} />
         {children}
      </label>
   );
}

export default Radio;
