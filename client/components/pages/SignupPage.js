import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Segment, Message, Grid, Header, Icon, Menu, Divider } from "semantic-ui-react";
import TopGrid from '../grids/TopGrid';
import SignupForm from "../forms/SignupForm";
import { signup, signupFB } from "../../actions/userActions";

const marginFix = {
  margin: "0"
};

class SignupPage extends React.Component {
  state = {
    loading: '',
    success: false,
    serverError: '',
  };

  submit2 = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  submit = (data) => {
    // console.log('Signup Page: submit');
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
    // console.log(signupData);
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
        <TopGrid />
        <Grid>
          <Grid.Column mobile={12} tablet={6} computer={6}>
            <Menu style={marginFix} secondary>
              <Menu.Menu style={marginFix} position="left">
                <Header color='grey'>REGISTER WITH CHATWITH</Header>
              </Menu.Menu>
            </Menu>
            <Divider style={marginFix} />
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
            <SignupForm signupSuccess={success} submit={this.submit} />
          </Grid.Column>
        </Grid>
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