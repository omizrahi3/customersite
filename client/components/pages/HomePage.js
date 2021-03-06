import React from "react";
import PropTypes from "prop-types";
import { Segment, Button, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? (
      <button onClick={() => logout()}>Logout</button>
    ) : (
      <div>
        <Segment padded>
          <Button primary fluid as={Link} to="/login">Login</Button>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid as={Link} to="/signup">Sign Up Now</Button>
        </Segment>
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.Token
  };
}

export default connect(mapStateToProps, { logout })(HomePage);

