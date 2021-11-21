import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './styles/Theme.css';

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root'),
);

/*
React
Dependencies

Components

Data

Utils

Views

Styles
*/
