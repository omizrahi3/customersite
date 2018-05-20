import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';


import { userSignupRequest } from '../../actions/signupActions';
import { addMessage } from '../../actions/messsageActions';

class SignupPage extends Component {
  render() {
    const { userSignupRequest, addMessage } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} addMessage={addMessage}/>
        </div>
      </div>
    )
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addMessage })(SignupPage);