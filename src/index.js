import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StarWarsProvider from './context/starWarsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <StarWarsProvider StarWarsProvider>
      <App />
      ;
    </StarWarsProvider>,
  );
