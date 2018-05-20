import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Greetings from './Greetings';
import SignupPage from './signup/SignupPage'
import SigninPage from './signin/SigninPage'
import LoginPage from './login/LoginPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavigationBar />
          <Route exact path='/' component={Greetings} />
          <Route path='/signin' component={SigninPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
        </div>
      </Router>
    )
  }
}

export default App;
