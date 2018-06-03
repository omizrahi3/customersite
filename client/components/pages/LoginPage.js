import React from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Segment, Message, Divider } from "semantic-ui-react";
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
      <Segment padded>
        <Link to="/signup">Not a member? Signup</Link> 
        {pageErrors.server && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{pageErrors.server}</p>
          </Message>
        )}
        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot Password?</Link> 
        <Divider horizontal>Or</Divider>
        <LoginFacebook submitFB={this.submitFB} displayError={this.displayError} />
      </Segment>
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