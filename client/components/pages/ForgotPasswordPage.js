import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Segment, Header, Message, Icon } from "semantic-ui-react";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

class ForgotPasswordPage extends React.Component {
  state = {
    loading: '',
    success: false,
    serverError: ''
  };

  submit2 = data =>
    this.props.resetPasswordRequest(data).then(() => this.setState({ success: true }));

  submit = (data) => {
    console.log('ForgotPassword Page: submit');

    this.setState({loading: 'true'});
    const forgotData = {
      EmailAddress: data.EmailAddress,
    };
    console.log(forgotData);
    const instance = axios.create({timeout: 3000});
    instance.post('http://www.qa.getchatwith.com/password/CreateUserResetPasswordEmail', forgotData)
    .then(res => {
      const { Error = false } = res.data;
      if (Error) return Promise.reject({server: res.data.Response})
      else return this.setState({ loading: 'false', success: true });
    })
    .catch(err => {
      this.setState({ loading: 'false', success: false, serverError: err.server })
    })
  }

  render() {
    const { loading, success, serverError } = this.state;
    return (
      <div>
        {loading === 'true' && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Request In Progress</Message.Header>
          </Message>
        )}
        {loading === 'false' &&
        success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Request Success. Check Email For Reset Link.
              </Message.Header>
            </Message.Content>
          </Message>
        )}
        {loading === 'false' &&
        !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Request Failed. {serverError}</Message.Header>
            </Message.Content>
          </Message>
        )}
        <Grid padded>
          <Grid.Column width={10} color="blue"></Grid.Column>
          <Grid.Column width={6} color="teal">
            <Segment inverted color="teal">Have Questions? support@getchatwith.com</Segment>
          </Grid.Column>
        </Grid>
        <Segment basic secondary>
          <Link to="/signup">Not a member? Register</Link>
          <Header as='h3' color='grey'>
            <Header.Content>
              RESET PASSWORD REQUEST
              <Header.Subheader>
                Required Field *
              </Header.Subheader>
            </Header.Content>
          </Header>
          <ForgotPasswordForm submit={this.submit} />
        </Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    );
  }
}

export default ForgotPasswordPage;