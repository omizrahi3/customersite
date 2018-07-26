import React, { Component } from 'react'
import PropTypes from "prop-types";
import {withRouter} from 'react-router'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/authActions";
import { Menu, Segment, Breadcrumb, Header } from "semantic-ui-react";

const headerStyle = {
  marginTop: '-1.0em',
  fontSize: '2.5em'
};

const linkStyle = {
  color: 'grey',
};

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
      <div style={{paddingTop: "20px"}}>
      <Menu icon='labeled' secondary>
        <Menu.Menu position="left">
          <Menu.Item style={{padding: "0px"}}>
            {pathname === '/login' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle}>Login</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/signup' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle}>Register</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/forgot_password' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle}>Forgot Password</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/reset_password' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle}>Reset Password</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/talent' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle}>Search</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/cart' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Cart</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/billing' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as="a" href="/cart">Cart</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Billing</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/profile' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as="a" href="/myaccount">My Account</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Edit Profile</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/myaccount' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>My Account</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/password' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as="a" href="/myaccount">My Account</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Reset Password</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/subscriptions' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as="a" href="/myaccount">My Account</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Subscriptions</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/orders' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as="a" href="/myaccount">My Account</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Order History</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/payments' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as="a" href="/myaccount">My Account</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Payment Method</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/categories/music' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Music</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/categories/sports' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Sports</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/categories/film-tv' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Film & TV</Breadcrumb.Section>
              </Breadcrumb>
            )}
            {pathname === '/categories/brand' && (
              <Breadcrumb>
                <Breadcrumb.Section style={linkStyle} as="a" href="https://getchatwith.com/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>Brands</Breadcrumb.Section>
              </Breadcrumb>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Segment style={{paddingLeft: "0px"}} basic compact>
        <Header style={headerStyle} color="yellow">
          {pathname === '/login' && (
            'LOGIN'
          )}
          {pathname === '/signup' && (
            'REGISTER'
          )}
          {pathname === '/forgot_password' && (
            'FORGOT PASSWORD'
          )}
          {pathname === '/reset_password' && (
            'RESET PASSWORD'
          )}
          {pathname === '/talent' && (
            'SEARCH'
          )}
          {pathname === '/cart' && (
            'CART'
          )}
          {pathname === '/billing' && (
            'BILLING'
          )}
          {pathname === '/myaccount' && (
            'MY ACCOUNT'
          )}
          {pathname === '/profile' && (
            'PROFILE'
          )}
          {pathname === '/subscriptions' && (
            'SUBSCRIPTIONS'
          )}
          {pathname === '/orders' && (
            'ORDER HISTORY'
          )}
          {pathname === '/payments' && (
            'PAYMENT METHOD'
          )}
          {pathname === '/password' && (
            'RESET PASSWORD'
          )}
          {pathname === '/categories/music' && (
            'MUSIC'
          )}
          {pathname === '/categories/sports' && (
            'SPORTS'
          )}
          {pathname === '/categories/film-tv' && (
            'FILM & TV'
          )}
          {pathname === '/categories/brand' && (
            'BRANDS'
          )}
        </Header>
       
      </Segment>
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
