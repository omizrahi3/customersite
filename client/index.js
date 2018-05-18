import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import App from './components/App';

// ReactDOM.render(
//   <BrowserRouter>
//     <Routes />
//   </BrowserRouter>,
//   document.getElementById('root'));

ReactDOM.render(<App />, 
  document.getElementById('root')
);