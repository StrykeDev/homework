import React, { createContext, useEffect, useState } from 'react';

import { LocalStorage } from '../services/LocalStorage';

import { THEME_COLOR, THEME_FONT } from '../utils/constants';
import { IContextProps } from './ContextLoader';

export enum EThemeColor {
   Dark = 'dark',
   Light = 'light',
}

export enum EThemeFont {
   Normal = 'normal',
   Large = 'large',
}

export const ThemeColorContext = createContext<any>(null);
export const ThemeFontContext = createContext<any>(null);

function ThemeContext({ children }: IContextProps): React.ReactElement {
   const [color, setColor] = useState(LocalStorage.getItem(THEME_COLOR) || EThemeColor.Dark);
   const [font, setFont] = useState(LocalStorage.getItem(THEME_FONT) || EThemeFont.Normal);

   useEffect(() => {
      document.body.setAttribute('data-theme-color', color.toString());
      document.body.setAttribute('data-theme-font', font.toString());
   }, []);

   useEffect(() => {
      document.body.classList.add('theme-active');

      document.body.setAttribute('data-theme-color', color.toString());
      document.body.setAttribute('data-theme-font', font.toString());

      LocalStorage.setItem(THEME_COLOR, color);
      LocalStorage.setItem(THEME_FONT, font);

      const handle = setTimeout(() => {
         document.body.classList.remove('theme-active');
      }, 500);

      return () => {
         clearTimeout(handle);
      };
   }, [color, font]);

   function toggleColor() {
      if (color === EThemeColor.Dark) {
         setColor(EThemeColor.Light);
      } else {
         setColor(EThemeColor.Dark);
      }
   }

   function toggleFont() {
      if (font === EThemeFont.Normal) {
         setFont(EThemeFont.Large);
      } else {
         setFont(EThemeFont.Normal);
      }
   }

   return (
      <ThemeColorContext.Provider value={{ color, setColor, toggleColor }}>
         <ThemeFontContext.Provider value={{ font, setFont, toggleFont }}>{children}</ThemeFontContext.Provider>
      </ThemeColorContext.Provider>
   );
}

export default ThemeContext;
