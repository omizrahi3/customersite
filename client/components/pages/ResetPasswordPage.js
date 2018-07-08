import React from "react";
import { Link } from 'react-router-dom';
import qs from 'query-string';
import axios from 'axios';
import { Grid, Segment, Header, Message, Icon } from "semantic-ui-react";
import ResetPasswordForm from "../forms/ResetPasswordForm";

class ResetPasswordPage extends React.Component {
  state = {
    loading: '',
    success: false,
    serverError: '',
    Token: '',
    UserId: ''
  };

  componentDidMount() {
    console.log('ResetPasswordPage did mount');
    console.log(this.props);
    const queryString = qs.parse(this.props.location.search)
    console.log(queryString);
    this.setState({ Token: queryString.Token, UserId: queryString.UserId })
  }

  submit = (data) => {
    console.log('ForgotPassword Page: submit');
    const { UserId, Token } = this.state;
    this.setState({loading: 'true'});
    const resetData = {
      AppUserId: UserId,
      LinkToken: Token,
      Password: data.Password
    };
    console.log(resetData);
    const instance = axios.create({timeout: 3000});
    instance.post('http://www.qa.getchatwith.com/password/AuthenticateResetPasswordLink', resetData)
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
              RESET PASSWORD SUBMIT
              <Header.Subheader>
                Required Field *
              </Header.Subheader>
            </Header.Content>
          </Header>
          <ResetPasswordForm submit={this.submit} />
        </Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    );
  }
}

export default ResetPasswordPage;