import React from 'react'
import { Route } from 'react-router-dom';
import HomePage from './components/pages/Homepage';
import LoginPage from './components/pages/LoginPage';

const App = () => {
  return (
    <div className="ui container">
      <Route path='/' exact component={HomePage} />
      <Route path='/login' exact component={LoginPage} />
    </div>
  )
}

export default App
