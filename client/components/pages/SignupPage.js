import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Segment, Divider, Message } from "semantic-ui-react";
import SignupForm from "../forms/SignupForm";
import SignupFacebook from '../facebook/SignupFacebook';
import { signup, signupFB } from "../../actions/userActions";

class SignupPage extends React.Component {
  state = {
    pageErrors: {}
  };

  displayError = (err) => this.setState({ pageErrors: err })

  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  submitFB = data =>
    this.props.signupFB(data).then(() => this.props.history.push("/login"));

  render() {
    const { pageErrors } = this.state;
    return (
      <Segment>
        <Link to="/login">Already a member? Login</Link>
        {pageErrors.server && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{pageErrors.server}</p>
          </Message>
        )}
        <SignupForm submit={this.submit} />
        <Divider horizontal>Or</Divider>
        <SignupFacebook submitFB={this.submitFB} displayError={this.displayError} />
      </Segment>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired,
  signupFB: PropTypes.func.isRequired
};

export default connect(null, { signup, signupFB })(SignupPage);