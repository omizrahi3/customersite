import React from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Segment, Message, Grid, Header, Icon, Menu, Divider } from "semantic-ui-react";
import TopGrid from '../grids/TopGrid';
import LoginForm from '../forms/LoginForm';
import { login, loginFB } from '../../actions/authActions';

const marginFix = {
  margin: "0"
};

class LoginPage extends React.Component {
  state = {
    loading: '',
    success: false,
    serverError: ''
  };

  componentDidMount() {
    console.log('LoginPage did mount');
    console.log(this.props.location.state);

  }

  submit = (data) => {
    console.log('Login Page: submit');
    this.setState({loading: 'true'});
    const loginData = {
      EmailAddress: data.EmailAddress,
      Password: data.Password,
    };
    console.log(loginData);
    this.props.login(loginData)
      .then(() => {
        console.log(this.props.location.state)
        if (!!this.props.location.state) {
          const { redirect } = this.props.location.state;
          if (redirect) this.props.history.push('/billing');
        } else {
          this.setState({ loading: 'false', success: true });
        }
      })
      .catch((err) => this.setState({ loading: 'false', success: false, serverError: err.server }));
  }
  
  submitFB = data =>
    this.props.loginFB(data).then(() => this.props.history.push('/dashboard'));

  render() {
    const { loading, success, serverError } = this.state;
    return (
      <div>
        <TopGrid />
        <Grid>
        <Grid.Column mobile={12} tablet={6} computer={6}>
            <Menu style={marginFix} secondary>
              <Menu.Menu style={marginFix} position="left">
                <Header color='grey'>LOGIN TO CHATWITH</Header>
              </Menu.Menu>
            </Menu>
            <Divider style={marginFix} />
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
              <LoginForm loggedIn={success} submit={this.submit} />
          </Grid.Column>
        </Grid>
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