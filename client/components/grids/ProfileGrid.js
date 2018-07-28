import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu, Header, List, Divider } from "semantic-ui-react";
import api from "../../api";

const linkStyle = {
  textDecoration: 'underline'
};

const marginFix = {
  margin: "0"
};

const listStyle = {
  color: 'grey'
};

class ProfileGrid extends Component {
  state = {
    userFetched: false,
    name: '',
    email: ''
  }

  componentDidMount() {
    // console.log('ProfileGrid did mount');
    const credentials = {
      Token: this.props.user.Token,
      data: {
        AppUserId: this.props.user.AppUserId
      }
    }
    api.user.fetchUser(credentials)
    .then(user => {
      this.setState({ userFetched: true, name: `${user[0].Firstname} ${user[0].Lastname}`, email: user[0].EmailAddress })
    })
    .catch(err => {
      // console.log('whoops');
    })
  }

  render() {
    return (
      <div>
        <Menu style={marginFix} secondary>
          <Menu.Menu style={marginFix} position="left">
            <Header color='grey'>PROFILE</Header>
          </Menu.Menu>
          <Menu.Menu style={marginFix} position="right">
          <List>
            <List.Item style={linkStyle} as={Link} to='/profile'>Edit</List.Item>
          </List>
          </Menu.Menu>
        </Menu>
        <Divider style={marginFix} />
        {this.state.userFetched && (
          <List>
            <List.Item style={listStyle} color="grey">{this.state.name}</List.Item>
            <List.Item style={listStyle} color="grey">{this.state.email}</List.Item>
          </List>
        )}
      </div>
    )
  }
}

ProfileGrid.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileGrid
