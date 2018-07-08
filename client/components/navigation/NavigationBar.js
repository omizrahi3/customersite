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
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Login</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/signup' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Register</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/forgot_password' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Forgot Password</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/talent' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Talent</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/cart' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Cart</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/profile' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Profile</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/categories/music' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Music</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/categories/sports' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Sports</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/categories/film-tv' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Film & TV</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/categories/brand' && (
              <Breadcrumb>
                <Breadcrumb.Section as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Brands</Breadcrumb.Section>
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
        {pathname === '/forgot_password' && (
          <Header size='huge' color="yellow">RESET PASSWORD</Header>
        )}
        {pathname === '/talent' && (
          <Header as='h1' color="yellow">SEARCH</Header>
        )}
        {pathname === '/cart' && (
          <Header as='h1' color="yellow">CART</Header>
        )}
        {pathname === '/profile' && (
          <Header as='h1' color="yellow">PROFILE</Header>
        )}
        {pathname === '/categories/music' && (
          <Header as='h1' color="blue">MUSIC</Header>
        )}
        {pathname === '/categories/sports' && (
          <Header as='h1' color="green">SPORTS</Header>
        )}
        {pathname === '/categories/film-tv' && (
          <Header as='h1' color="red">FILM & TV</Header>
        )}
        {pathname === '/categories/brand' && (
          <Header as='h1' color="purple">BRANDS</Header>
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
