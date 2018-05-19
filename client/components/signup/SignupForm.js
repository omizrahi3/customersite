import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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

  onSubmit(e) {
    this.setState({ errors: {}, isLoading: true });
    e.preventDefault();
    console.log(this.state);
    this.props.userSignupRequest(this.state)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      const { data } = error.response; 
      console.log(data)
      this.setState({ errors: data, isLoading: false });
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join Chat With</h1>

        <div className={classnames("form-group", { 'has-error': errors.username })}>
          <label className="control-label">Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            className="form-control"
          />
          {errors.username && <span className="help-block">{errors.username}</span>}
        </div>

        <div className={classnames("form-group", { 'has-error': errors.email })}>
          <label className="control-label">Email</label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email"
            className="form-control"
          />
          {errors.email && <span className="help-block">{errors.email}</span>}
        </div>

        <div className={classnames("form-group", { 'has-error': errors.password })}>
          <label className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="text"
            name="password"
            className="form-control"
          />
          {errors.password && <span className="help-block">{errors.password}</span>}
        </div>

        <div className={classnames("form-group", { 'has-error': errors.passwordConfirmation })}>
          <label className="control-label">Confirm Password</label>
          <input
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="text"
            name="passwordConfirmation"
            className="form-control"
          />
          {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Signup</button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default SignupForm;