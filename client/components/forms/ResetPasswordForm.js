import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      Password: "",
      PasswordConfirm: ""
    },
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data)
    }
  };

  validate = data => {
    const errors = {};
    if (!data.Password) errors.password = "Please Enter Password";
    if (data.Password !== data.PasswordConfirm) {
      errors.passwordconfirm = "Password Does Not Match";
    }
    return errors;
  };

  render() {
    const { errors, data } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          error={!!errors.password}
          width={6}
          type="password"
          id='password'
          control={Input}
          label={`${errors.password !== undefined ? errors.password:'Password *'}`}
          placeholder=''
          name="Password"
          value={data.Password}
          onChange={this.onChange}
        />
        <Form.Field
          error={!!errors.passwordconfirm}
          width={6}
          type="password"
          id='passwordConfirm'
          control={Input}
          label='Password Confirm *'
          placeholder={errors.passwordconfirm}
          name="PasswordConfirm"
          value={data.PasswordConfirm}
          onChange={this.onChange}
        />
        <Button primary>Submit Request</Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;