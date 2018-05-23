import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import FacebookLogin from 'react-facebook-login';

class LoginFacebook extends Component {
  state = {
    loading: false,
    fbErrors: {}
  };

  componentClicked = () => console.log('facebook button clicked');

  responseFacebook = response => {
    console.log(response);
    const { accessToken } = response;
    const data = {
      Token: accessToken
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
    const { fbErrors, loading } = this.state;

    const fbContent = (
      <FacebookLogin
        appId="1876716225959958"
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