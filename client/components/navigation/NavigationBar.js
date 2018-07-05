import React, { Component } from 'react'
import PropTypes from "prop-types";
import {withRouter} from 'react-router'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/authActions";
import { Menu, Segment, Breadcrumb, Label, Header, Icon } from "semantic-ui-react";

class NavigationBar extends Component {
  state = {
    page: ''
  }

  componentDidMount() {
    console.log('hello from nav bar')
    console.log(this.props.location.pathname);
    const { pathname } = this.props.location;
    const { user } = this.props;
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      console.log('no user')
    } else {
      console.log('yes user')
    }

    if (pathname === '/login') {
      console.log('true');
    }
    switch (pathname) {
      case '/login':
        this.setState({page: 'login'});
        break;
      case '/signup':
        this.setState({page: 'signup'});
        break
      case '/talent':
        this.setState({page: 'talent'});
        break
      default:
      this.setState({page: '/'});
    }
  }
  render() {
    const { user, cart, logout, location } = this.props;
    const { pathname } = location;
    return (
      <div>
      <Segment basic></Segment>
      <Menu icon='labeled' secondary>
        <Menu.Menu position="left">
          <Menu.Item>
            {pathname === '/login' && (
              <Breadcrumb>
                <Breadcrumb.Section as={Link} to="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Login</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/signup' && (
              <Breadcrumb>
                <Breadcrumb.Section as={Link} to="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Register</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/talent' && (
              <Breadcrumb>
                <Breadcrumb.Section as={Link} to="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Talent</Breadcrumb.Section>
              </Breadcrumb>
            )}
          </Menu.Item>
        </Menu.Menu>

        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/cart" name='cart arrow down'>
            {cart.length === 0 && (
              <Icon name='cart arrow down' />
            )}
            {cart.length > 0 && (
              <Icon color='green' name='cart arrow down' />
            )}
            CART
          </Menu.Item>
          {Object.keys(user).length !== 0 && user.constructor === Object && (
            <Menu.Item as={Link} to="/profile" name='cart arrow down'>
              <Icon name='user' />
              PROFILE
            </Menu.Item>
          )}
          {Object.keys(user).length !== 0 && user.constructor === Object && (
            <Menu.Item name='logout' onClick={() => logout()}>
              <Icon name='sign out' />
              LOG OUT
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
      <Segment basic compact>
        {pathname === '/login' && (
          <Header size='huge' color="yellow">LOGIN</Header>
        )}
        {pathname === '/signup' && (
          <Header size='huge' color="yellow">REGISTER</Header>
        )}
        {pathname === '/talent' && (
          <Header size='huge' color="yellow">SEARCH</Header>
        )}
      </Segment>
      <Segment basic></Segment>
      </div>
    )
  }
}

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    cart: state.cart
  };
}

export default withRouter(connect(mapStateToProps, { logout: actions.logout })(NavigationBar))
