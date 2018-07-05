import React from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Segment, Message, Grid, Header, Icon } from "semantic-ui-react";
import LoginForm from '../forms/LoginForm';
import LoginFacebook from '../facebook/LoginFacebook';
import { login, loginFB } from '../../actions/authActions';

class LoginPage extends React.Component {
  state = {
    loading: '',
    success: false,
    serverError: ''
  };

  componentDidMount() {
    console.log('LoginPage did mount');
    const { user } = this.props;
    if (Object.keys(user).length === 0 && user.constructor === Object) {
    } else {
      this.setState({ loading: 'false', success: true });
    }
  }

  submit2 = data =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'));

  submit = (data) => {
    console.log('Login Page: submit');
    this.setState({loading: 'true'});
    const loginData = {
      EmailAddress: data.EmailAddress,
      Password: data.Password,
    };
    console.log(loginData);
    this.props.login(loginData)
      .then(() => this.setState({ loading: 'false', success: true }))
      .catch((err) => this.setState({ loading: 'false', success: false, serverError: err.server }));
  }
  
  submitFB = data =>
    this.props.loginFB(data).then(() => this.props.history.push('/dashboard'));

  render() {
    const { loading, success, serverError } = this.state;
    return (
      <div>
        {loading === 'true' && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Login In Progress</Message.Header>
          </Message>
        )}
        {loading === 'false' &&
        success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Login Complete. Start Searching Talent.
              </Message.Header>
              <Link to="/talent">Talent Page</Link>
            </Message.Content>
          </Message>
        )}
        {loading === 'false' &&
        !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Login Failed. {serverError}</Message.Header>
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
              LOGIN TO CHATWITH
              <Header.Subheader>
                Required Field *
              </Header.Subheader>
            </Header.Content>
          </Header>
          <LoginForm loggedIn={success} submit={this.submit} />
        </Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  loginFB: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { login, loginFB })(LoginPage);