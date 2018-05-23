import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import LoginForm from '../forms/LoginForm';
import LoginFacebook from '../facebook/LoginFacebook';
import { login, loginFB } from '../../actions/authActions';

class LoginPage extends React.Component {
  state = {
    pageErrors: {}
  };

  displayError = (err) => this.setState({ pageErrors: err })

  submit = data =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'));
  
  submitFB = data =>
    this.props.loginFB(data).then(() => this.props.history.push('/dashboard'));

  render() {
    const { pageErrors } = this.state;
    return (
      <div>
        <h1>Login page</h1>
        {pageErrors.server && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{pageErrors.server}</p>
          </Message>
        )}
        <LoginForm submit={this.submit} />
        <br/>
        <LoginFacebook submitFB={this.submitFB} displayError={this.displayError} />
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