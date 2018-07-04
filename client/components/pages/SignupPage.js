import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Segment, Divider, Message, Grid, Header, Icon } from "semantic-ui-react";
import SignupForm from "../forms/SignupForm";
import SignupFacebook from '../facebook/SignupFacebook';
import { signup, signupFB } from "../../actions/userActions";

class SignupPage extends React.Component {
  state = {
    pageErrors: {},
    loading: '',
    success: false,
    serverMessage: 'Duplicate Email Address'
  };

  displayError = (err) => this.setState({ pageErrors: err })

  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  submitFB = data =>
    this.props.signupFB(data).then(() => this.props.history.push("/login"));

  render() {
    const { pageErrors, loading, success } = this.state;
    return (
      <div>
        {loading === 'true' && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Registration In Progress</Message.Header>
          </Message>
        )}
        {loading === 'false' &&
        success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Registration Complete. Confirmation Email Sent.
              </Message.Header>
              <Link to="/login">Login Now</Link>
            </Message.Content>
          </Message>
        )}
        {loading === 'false' &&
        !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Registration Failed. {this.state.serverMessage}</Message.Header>
            </Message.Content>
          </Message>
        )}
        <Grid padded>
          <Grid.Column width={10} color="blue">

          </Grid.Column>
          <Grid.Column width={6} color="teal">
            <Segment inverted color="teal">Have Questions? support@getchatwith.com</Segment>
          </Grid.Column>
        </Grid>
        <Segment basic secondary>
          <Link to="/login">Already a member? Login</Link>
          {pageErrors.server && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{pageErrors.server}</p>
            </Message>
          )}
          <Header as='h3' color='grey'>
            <Header.Content>
              REGISTER FOR CHATWITH
              <Header.Subheader>
                Required Field *
              </Header.Subheader>
            </Header.Content>
          </Header>
          <SignupForm submit={this.submit} />
          <Divider horizontal>Or</Divider>
          <SignupFacebook submitFB={this.submitFB} displayError={this.displayError} />
        </Segment>
      </div>
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