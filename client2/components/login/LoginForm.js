import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import TextFieldGroup from '../signup/TextFieldGroup';
import { validateLogin } from '../../../helpers/validate';
import { login } from '../../actions/authActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailAddress: '',
      Password: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid() {
    console.log('isValid');
    const { errors, isValid } = validateLogin(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    console.log('onSubmit');
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state)
      .then(response => {
        const { data } = response;
        console.log(data.Response);
        if (!data.Response.ValidAppUser) {
          this.setState({ errors: {form: 'User Does Not Exist'}, isLoading: false });
        } else if (!data.Response.Authenticated) {
          this.setState({ errors: {form: 'Incorrect Password'}, isLoading: false });
        } else {
          this.setState({ errors: {form: 'User Logged In'}, isLoading: false });
        }
        // this.context.router.history.push('/');
      })
      .catch(error => {
        const { data } = error.response;
        this.setState({ errors: {form: 'Invalid Credentials'}, isLoading: false });
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, EmailAddress, Password, isLoading} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Login with Email and Password</h2>

        { errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field="EmailAddress"
          label="Email Address"
          value={EmailAddress}
          error={errors.EmailAddress}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="Password"
          label="Password"
          value={Password}
          error={errors.Password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(connect(null, { login })(LoginForm));