import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import classnames from 'classnames';
import { validateSignupForm } from '../../../helpers/validate'
import TextFieldGroup from './TextFieldGroup';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailAddress: '',
      Firstname: '',
      Lastname: '',
      Gender: '',
      Birthdate: '',
      Password: '',
      PasswordConfirmation: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid() {
    console.log('isValid');
    const { errors, isValid } = validateSignupForm(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
   }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
      .then(response => {
        console.log(response);
        this.context.router.history.push('/');
      })
      .catch(error => {
        const { data } = error.response;
        console.log(data);
        this.setState({ errors: data, isLoading: false });
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join Chat With</h1>

        <TextFieldGroup
          error={errors.EmailAddress}
          label="Email"
          onChange={this.onChange}
          value={this.state.EmailAddress}
          field="EmailAddress"
        />

        <TextFieldGroup
          error={errors.Firstname}
          label="First Name"
          onChange={this.onChange}
          value={this.state.Firstname}
          field="Firstname"
        />

        <TextFieldGroup
          error={errors.Lastname}
          label="Last Name"
          onChange={this.onChange}
          value={this.state.Lastname}
          field="Lastname"
        />

        <TextFieldGroup
          error={errors.Gender}
          label="Gender"
          onChange={this.onChange}
          value={this.state.Gender}
          field="Gender"
        />

        <TextFieldGroup
          error={errors.Birthdate}
          label="Birthdate"
          onChange={this.onChange}
          value={this.state.Birthdate}
          field="Birthdate"
        />

        <TextFieldGroup
          error={errors.Password}
          label="Password"
          onChange={this.onChange}
          value={this.state.Password}
          field="Password"
        />

        <TextFieldGroup
          error={errors.PasswordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.PasswordConfirmation}
          field="PasswordConfirmation"
        />

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Signup</button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(SignupForm);