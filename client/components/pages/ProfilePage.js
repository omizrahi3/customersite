import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment, Image, Breadcrumb, Header, Modal, Button, Icon, Label } from "semantic-ui-react";
import axios from 'axios';
import UpdateProfileForm from '../forms/UpdateProfileForm';
import { updatedProfile } from '../../actions/userActions';

class ProfilePage extends Component {
  state = {
    profile: {}
  }

  componentDidMount() {
    console.log('ProfilePage did mount')
    console.log(this.props.user);
    const { Token, AppUserId } = this.props.user;
    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = Token;
    instance.post('http://www.qa.getchatwith.com/api/GetAppUserById', { AppUserId })
    .then(res => res.data.Response[0])
    .then(profile => {
      console.log(profile);
      this.setState({ profile });
    });
  }

  submit = (data) => {
    console.log('submit');
    data.AppUserId = this.props.user.AppUserId;
    const user = {
      Token: this.props.user.Token,
      profile: data
    };
    console.log(user);
    return this.props.updatedProfile(user).then(() => this.props.history.push('/dashboard'));
  }

  render() {
    const { Token } = this.props.user;
    return (
      <div>
        <h2>{`${Token}`}</h2>
        {this.state.profile && (
            <UpdateProfileForm submit={this.submit} profile={this.state.profile} />
          )}
      </div>
    )
  }
}

updatedProfile.propTypes = {
  updatedProfile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { updatedProfile })(ProfilePage);