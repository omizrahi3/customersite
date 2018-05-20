import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';

// const Routes = () => {
//   return (
//     <Route exact path="/test" component={Greetings} />
//   );
// };

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={App} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;