import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Facebook extends Component {
  constructor(props) {
    super(props);
  }

  componentClicked() {
    console.log('facebook button clicked');
  }

  responseFacebook(response) {
    console.log(response);
  }

  render() {
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

export default Facebook;
