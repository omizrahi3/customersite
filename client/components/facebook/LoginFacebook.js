import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import FacebookLogin from 'react-facebook-login';

class LoginFacebook extends Component {
  state = {
    loading: false,
    devId: '1661412007228476',
    fbId: '1876716225959958',
    maddId: '1914140115544851'
  };

  componentClicked = () => console.log('facebook button clicked');

  responseFacebook = response => {
    console.log(response);
    const { accessToken } = response;
    const tempToken = "EAAbM5nmjKxMBAO0vcQpZC8U1aUF7x2bYK22DZBvn8gnrOg8Qoz6UyhMpuRSmPqAG5wL9omZBenj09hhxaRcT4lbpg8FucjyBD8I4cahr6s8QmyVfDuDD0D6XHdrGjkPS0y8ykwef6Hi6FSFfSYU3MGAPo2s434IsrFZAq8jggrbvYR4o5pRbZCfGqKdXb5pEP7Na5BCZBPzWB6EFdNoZCa3HuXZCViMpAeMLRC9pAUgikQZDZD";
    const data = {
      Token: tempToken
    }
    this.setState({ loading: true });
    this.props
      .submitFB(data)
      .catch(err => {
        this.setState({ loading: false });
        this.props.displayError(err);
      });
  };

  render() {
    const { loading, fbId } = this.state;

    const fbContent = (
      <FacebookLogin
        appId={fbId}
        autoLoad={false}
        fields="first_name,last_name,email,picture,gender,birthday"
        scope="public_profile,user_birthday,user_gender"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />
    );
    return (
      <div>
        {fbContent}
      </div>
    )
  }
}

LoginFacebook.propTypes = {
  submitFB: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired
};

export default LoginFacebook;