import React from 'react';

import ThemeContext from './ThemeContext';

export interface IContextProps {
   children: React.ReactElement;
}

function ContextLoader({ children }: IContextProps) {
   return <ThemeContext>{children}</ThemeContext>;
}

export default ContextLoader;
