import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import reducers from './reducers';
import App from './components/App';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument(axiosInstance)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
<Provider store={store}><App /></Provider>, 
  document.getElementById('root')
);