import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Icon, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/authActions";

const TopNavigation = ({ user, logout, cart }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Welcome {user.AppUserId}
    </Menu.Item>

    <Menu.Menu position="right">
      <Menu.Item>
        <Label color='teal' size='huge' as={Link} to='/cart'>
          <Icon name='shopping cart' /> {cart.length}
        </Label>
      </Menu.Item>
      <Dropdown trigger={<Icon name="user" size='huge' />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          <Dropdown.Item as={Link} to='/profile'>Profile</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    AppUserId: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    cart: state.cart
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);