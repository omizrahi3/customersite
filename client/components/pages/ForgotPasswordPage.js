import React from "react";
import { Link } from 'react-router-dom';
import api from "../../api";
import { Grid, Segment, Header, Message, Icon, Menu, Divider } from "semantic-ui-react";
import TopGrid from '../grids/TopGrid';
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

const marginFix = {
  margin: "0"
};

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
    const requestData = {
      EmailAddress: data.EmailAddress,
    };
    api.user.resetPasswordRequest(requestData)
    .then(res => {
      console.log('api.user.resetPasswordRequest');
      console.log(res.Response);
      const { Error = false } = res.Response;
      if (Error) return Promise.reject({server: 'Please Contact support@getchatwith.com'})
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
        <TopGrid />
        <Grid>
          <Grid.Column mobile={16} tablet={6} computer={6}>
            <Menu style={marginFix} secondary>
              <Menu.Menu style={marginFix} position="left">
                <Header color='grey'>FORGOT PASSWORD</Header>
              </Menu.Menu>
            </Menu>
            <Divider style={marginFix} />
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
            <ForgotPasswordForm submit={this.submit} />
          </Grid.Column>
        </Grid>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    );
  }
}

export default ForgotPasswordPage;