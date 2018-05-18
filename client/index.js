import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import Routes from './Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';

// ReactDOM.render(
//   <BrowserRouter>
//     <Routes />
//   </BrowserRouter>,
//   document.getElementById('root'));

const store = createStore((state = {}) => state, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}><App /></Provider>, 
  document.getElementById('root')
);