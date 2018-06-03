import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Segment, Divider } from "semantic-ui-react";
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
      <Segment>
        <Link to="/login">Already a member? Login</Link> 
        <SignupForm submit={this.submit} />
        <Divider horizontal>Or</Divider>
        <SignupFacebook />
      </Segment>
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