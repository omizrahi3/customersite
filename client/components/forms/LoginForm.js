import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
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
      this.setState({ loading: true })
      this.props
        .submit(this.state.data)
        .catch(err => 
          {
            console.log(err);
            this.setState({ errors: err, loading: false })
          }
      );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.EmailAddress)) errors.email = "Please Enter Valid Email";
    if (!data.Password) errors.password = "Please Enter Password";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.server && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.server}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="EmailAddress"
            placeholder="example@example.com"
            value={data.EmailAddress}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="Password"
            placeholder="Make it secure"
            value={data.Password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;