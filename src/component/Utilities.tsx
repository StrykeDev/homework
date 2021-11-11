import React from 'react';
import { v4 as uuid } from 'uuid';
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
