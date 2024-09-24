import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ensure the root element is correctly typed
const rootElement = document.getElementById('root') as HTMLElement;

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance in your app, if needed
reportWebVitals();
