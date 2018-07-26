import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment, Message, Icon, Header, Divider, Menu } from "semantic-ui-react";
import TopGrid from '../grids/TopGrid';
import UpdateProfileForm from '../forms/UpdateProfileForm';
import MyAccountBar from '../navigation/MyAccountBar';
import { updatedProfile } from '../../actions/userActions';
import api from "../../api";

const marginFix = {
  margin: "0"
};

class ProfilePage extends Component {
  state = {
    loading: '',
    success: false,
    serverError: ''
  }

  componentDidMount() {
    console.log('ProfilePage did mount')
  }

  submit = (data) => {
    console.log('submit');
    this.setState({ loading: 'true'})
    const credentials = {
      Token: this.props.user.Token,
      data: {
        'AppUserId': this.props.user.AppUserId,
        "EmailAddress": data.EmailAddress,
        "Firstname": data.Firstname,
        "Lastname": data.Lastname,
        "Gender": data.Gender,
        "Birthdate": data.Birthdate
      }
    };
    console.log(credentials);
    api.user.updateProfile(credentials)
    .then(res => {
      console.log('api.user.updateProfile response');
      console.log(res);
      const { Error, Response } = res;
      if (Error) {
        return Promise.reject({
          server: Response
        });
      } else {
        this.setState({ loading: 'false', success: true });
      }
    })
    .catch(err => this.setState({ loading: 'false', success: false, serverError: err.server }));
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;
    const { loading, success, serverError } = this.state;
    return (
      <div>
        <TopGrid />
        <Grid>
          <Grid.Column mobile={16} tablet={3} computer={3}>
            <MyAccountBar path={pathname}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Menu style={marginFix} secondary>
              <Menu.Menu style={marginFix} position="left">
                <Header color='grey'>EDIT PROFILE</Header>
              </Menu.Menu>
            </Menu>
            <Divider style={marginFix} />
              {loading === 'true' && (
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Header>Profile Update In Progress</Message.Header>
                </Message>
              )}
              {loading === 'false' &&
              success && (
                <Message success icon>
                  <Icon name="checkmark" />
                  <Message.Content>
                    <Message.Header>
                      Update Complete.
                    </Message.Header>
                  </Message.Content>
                </Message>
              )}
              {loading === 'false' &&
              !success && (
                <Message negative icon>
                  <Icon name="warning sign" />
                  <Message.Content>
                    <Message.Header>Update Failed. {serverError}</Message.Header>
                  </Message.Content>
                </Message>
              )}
              <UpdateProfileForm submit={this.submit} />
          </Grid.Column>
        </Grid>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
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