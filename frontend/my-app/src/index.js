import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextImgProvider } from './context/context-img/context-img.context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextImgProvider>
        <App />
      </ContextImgProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
