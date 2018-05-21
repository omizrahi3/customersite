import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import { userLoggedIn } from "./actions/authActions";
import reducers from './reducers'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.chatwithJWT) {
  const user = {
    Token: localStorage.chatwithJWT,
  };
  store.dispatch(userLoggedIn(user));
}

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
