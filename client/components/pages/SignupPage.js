import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Segment, Message, Grid, Header, Icon } from "semantic-ui-react";
import SignupForm from "../forms/SignupForm";
import { signup, signupFB } from "../../actions/userActions";

class SignupPage extends React.Component {
  state = {
    loading: '',
    success: false,
    serverError: '',
  };

  submit2 = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  submit = (data) => {
    console.log('Signup Page: submit');
    this.setState({loading: 'true'});
    const signupData = {
      EmailAddress: data.EmailAddress,
      Firstname: data.Firstname,
      Lastname: data.Lastname,
      Gender: data.Gender,
      Birthdate: data.Birthdate,
      Password: data.Password,
      ContentType: "image/jpeg"
    };
    console.log(signupData);
    this.props.signup(signupData)
      .then(() => this.setState({ loading: 'false', success: true }))
      .catch((err) => this.setState({ loading: 'false', success: false, serverError: err.server }));
  }

  submitFB = data =>
    this.props.signupFB(data).then(() => this.props.history.push("/login"));

  render() {
    const { loading, success, serverError } = this.state;
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
              <Message.Header>Registration Failed. {serverError}</Message.Header>
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
          <Header as='h3' color='grey'>
            <Header.Content>
              REGISTER FOR CHATWITH
              <Header.Subheader>
                Required Field *
              </Header.Subheader>
            </Header.Content>
          </Header>
          <SignupForm signupSuccess={success} submit={this.submit} />
        </Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
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