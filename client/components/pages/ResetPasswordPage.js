import React from "react";
import { Link } from 'react-router-dom';
import qs from 'query-string';
import api from "../../api";
import { Grid, Segment, Header, Message, Icon, Menu, Divider } from "semantic-ui-react";
import TopGrid from '../grids/TopGrid';
import ResetPasswordForm from "../forms/ResetPasswordForm";

const marginFix = {
  margin: "0"
};

class ResetPasswordPage extends React.Component {
  state = {
    loading: '',
    success: false,
    serverError: '',
    Token: '',
    UserId: ''
  };

  componentDidMount() {
    // console.log('ResetPasswordPage did mount');
    // console.log(this.props);
    const queryString = qs.parse(this.props.location.search)
    // console.log(queryString);
    this.setState({ Token: queryString.Token, UserId: queryString.UserId })
  }

  submit = (data) => {
    // console.log('ForgotPassword Page: submit');
    const { UserId, Token } = this.state;
    this.setState({loading: 'true'});
    const resetData = {
      AppUserId: UserId,
      LinkToken: Token,
      Password: data.Password
    };
    // console.log(resetData);
    api.user.resetPassword(resetData)
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
        <TopGrid />
        <Grid>
          <Grid.Column mobile={16} tablet={6} computer={6}>
            <Menu style={marginFix} secondary>
              <Menu.Menu style={marginFix} position="left">
                <Header color='grey'>RESET PASSWORD</Header>
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
            <ResetPasswordForm submit={this.submit} />
          </Grid.Column>
        </Grid>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    );
  }
}

export default ResetPasswordPage;