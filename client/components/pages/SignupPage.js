import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupForm from "../forms/SignupForm";
import SignupFacebook from '../facebook/SignupFacebook';
import { signup } from "../../actions/userActions";

class SignupPage extends React.Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  submitFB = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  render() {
    return (
      <div>
        <h1>Signup page</h1>
        <SignupForm submit={this.submit} />
        <br/>
        <SignupFacebook />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);