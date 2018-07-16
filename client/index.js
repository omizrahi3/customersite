import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import { userLoggedIn } from "./actions/authActions";
import { loadCart } from "./actions/cartActions";
import reducers from './reducers'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.chatwithJWT && localStorage.chatwithUserId) {
  const user = {
    Token: localStorage.chatwithJWT,
    AppUserId: localStorage.chatwithUserId
  };
  store.dispatch(userLoggedIn(user));
}

if (localStorage.chatwithCart) {
  const storedCart = JSON.parse(localStorage.getItem("chatwithCart"));
  store.dispatch(loadCart(storedCart));
} else {
  const cart = [];
  localStorage.setItem("chatwithCart", JSON.stringify(cart));
}

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
