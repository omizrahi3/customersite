import React, { Component } from 'react'
import PropTypes from "prop-types";
import {withRouter} from 'react-router'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/authActions";
import { Menu, Segment, Breadcrumb, Label, Header } from "semantic-ui-react";

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
      default:
      this.setState({page: '/'});
    }
  }
  render() {
    const { user, cart, logout } = this.props;
    const { page } = this.state;
    return (
      <Menu secondary>
        <Menu.Menu position="left">
          <Segment basic>
            {page === 'login' && (
              <div>
                <Breadcrumb>
                  <Breadcrumb.Section as={Link} to="https://getchatwith.com/">Home</Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right chevron' />
                  <Breadcrumb.Section active>Login</Breadcrumb.Section>
                </Breadcrumb>
                <Header size='huge' color="yellow">LOGIN</Header>
              </div>
            )}
            {page === 'signup' && (
              <div>
                <Breadcrumb>
                  <Breadcrumb.Section as={Link} to="https://getchatwith.com/">Home</Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right chevron' />
                  <Breadcrumb.Section active>Register</Breadcrumb.Section>
                </Breadcrumb>
                <Header size='huge' color="yellow">REGISTER</Header>
              </div>
            )}
            {page === 'talent' && (
              <Breadcrumb>
                <Breadcrumb.Section as={Link} to="/dashboard">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Sports</Breadcrumb.Section>
              </Breadcrumb>
            )}
          </Segment>
        </Menu.Menu>

        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          {Object.keys(user).length !== 0 && user.constructor === Object && (
            <Menu.Item>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          )}
          {Object.keys(user).length !== 0 && user.constructor === Object && (
            <Menu.Item>
              <Label as='a' onClick={() => logout()}>
                Logout
              </Label>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
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
