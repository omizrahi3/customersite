import React, { Component } from 'react';
import PropTypes from "prop-types";
import FacebookLogin from 'react-facebook-login';

class SignupFacebook extends Component {
  state = {
    loading: false,
    fbId: '1876716225959958'
  };

  componentClicked = () => console.log('facebook button clicked');

  responseFacebook = response => {
    const { email, first_name, last_name, accessToken } = response;
    const gender = response.gender === 'male' ? 'm' : 'f';
    var res = response.birthday.split("/");
    const birthday = `${res[2]}-${res[0]}-${res[1]}`
    const data = {
      "EmailAddress": email,
      "Firstname": first_name,
      "Lastname": last_name,
      "Gender": gender,
      "Birthdate": birthday,
      "Token" : accessToken
    }
    this.setState({ loading: true });
    this.props
    .submitFB(data)
    .catch(err => {
      this.setState({ loading: false });
      this.props.displayError(err);
    });
  }

  render() {
    const fbContent = (
      <FacebookLogin
        appId="1914140115544851"
        autoLoad={false}
        fields="first_name,last_name,email,picture,gender,birthday"
        scope="public_profile,user_birthday,user_gender"
        textButton="Signup with Facebook"
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

SignupFacebook.propTypes = {
  submitFB: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired
};

export default SignupFacebook;
