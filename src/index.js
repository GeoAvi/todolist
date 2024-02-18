import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to to do app',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-template-curly-in-string
  console.log('Listening to http://localhost:${PORT}');
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
