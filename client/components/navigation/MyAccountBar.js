import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { List, Responsive, Segment } from "semantic-ui-react";
import * as actions from "../../actions/authActions";

const linkStyle = {
  color: 'grey',
  textDecoration: 'underline',
  paddingBottom: '20px'
};

const highlightedlinkStyle = {
  color: 'gold',
  textDecoration: 'underline',
  paddingBottom: '20px'
};

class MyAccountBar extends Component {
  render() {
    const { path, logout } = this.props;
    return (
      <Segment basic secondary>
        <List>
          <List.Item style={path === '/myaccount' ? highlightedlinkStyle : linkStyle} as={Link} to="/myaccount">My Account</List.Item>
          <List.Item style={path === '/profile' ? highlightedlinkStyle : linkStyle} as={Link} to="/profile">Edit Profile</List.Item>
          <List.Item style={path === '/password' ? highlightedlinkStyle : linkStyle} as={Link} to="/password">Reset Password</List.Item>
          <List.Item style={path === '/subscriptions' ? highlightedlinkStyle : linkStyle} as={Link} to="/subscriptions">Subscriptions</List.Item>
          <List.Item style={path === '/orders' ? highlightedlinkStyle : linkStyle} as={Link} to="/orders">Order History</List.Item>
          <List.Item style={path === '/payments' ? highlightedlinkStyle : linkStyle} as={Link} to="/payments">Payment Method</List.Item>
          <List.Item style={linkStyle} as="a" onClick={() => logout()}>Logout</List.Item>
        </List>
      </Segment>
    )
  }
}

MyAccountBar.propTypes = {
  path: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout: actions.logout })(MyAccountBar);
