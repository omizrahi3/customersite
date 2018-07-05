import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Message } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      EmailAddress: "",
      Password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      console.log(this.state.data);
      this.props.submit(this.state.data)
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.EmailAddress)) errors.email = "Please Enter Valid Email";
    if (!data.Password) errors.password = "Please Enter Password";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    const { loggedIn } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          disabled={loggedIn}
          error={!!errors.email}
          width={6}
          type="email"
          id='email'
          control={Input}
          label={`${errors.email !== undefined ? errors.email:'Email *'}`}
          placeholder=''
          name="EmailAddress"
          value={data.EmailAddress}
          onChange={this.onChange}
        />
        <Form.Field
          disabled={loggedIn}
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
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired
};

export default LoginForm;