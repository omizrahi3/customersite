import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Greetings from './Greetings';
import SignupPage from './signup/SignupPage'

// class App extends React.Component {
//   render() {
//     return (
//         <NavigationBar />
//     )
//   }
// }

// class App extends Component {
//   render() {
//     return (
//       <div className="container">
//         <NavigationBar />
//         <Route path='/' component={Greetings} />
//         <Route path='/signup' component={SignupPage} />
//       </div>
//     )
//   }
// }

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavigationBar />
          <Route exact path='/' component={Greetings} />
          <Route path='/signup' component={SignupPage} />
        </div>
      </Router>
    )
  }
}

export default App;
