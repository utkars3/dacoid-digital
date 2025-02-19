import React from 'react';
import ReactDOM from 'react-dom/client'; // use 'react-dom' for older React versions
// import './index.css'; // Optional: import global styles if you have any
import App from './App'; // Import the root App component

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);
