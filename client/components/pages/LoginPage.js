import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from '../forms/LoginForm';
import LoginFacebook from '../facebook/LoginFacebook';
import { login, loginFB } from '../../actions/authActions';

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'));
  
  submitFB = data =>
    this.props.loginFB(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h1>Login page</h1>

        <LoginForm submit={this.submit} />
        <br/>
        <LoginFacebook submitFB={this.submitFB}/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  loginFB: PropTypes.func.isRequired
};

export default connect(null, { login, loginFB })(LoginPage);