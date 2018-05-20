import React, { Component } from 'react'

import Facebook from './Facebook';

class SigninPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h1>Signin with Facebook</h1>
          <Facebook />
        </div>
      </div>
    )
  }
}

export default SigninPage;