import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './styles/Theme.css';

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <App />
         <div>
            {/* <div style={{ padding: '1em', backgroundColor: 'var(--color-accent-light)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-accent-normal)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-accent-dark)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-secondary-light)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-secondary-normal)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-secondary-dark)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-success-light)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-success-normal)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-success-dark)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-danger-light)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-danger-normal)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-danger-dark)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-bg-light)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-bg-normal)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-bg-dark)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-text-light)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-text-normal)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-text-dark)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-btn-light)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-btn-normal)' }}> </div>
            <div style={{ padding: '1em', backgroundColor: 'var(--color-btn-dark)' }}> </div> */}
         </div>
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
