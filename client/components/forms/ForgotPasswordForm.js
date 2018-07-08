import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      EmailAddress: ""
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
    if (!isEmail(data.EmailAddress)) errors.email = "Please Enter Valid Email";
    return errors;
  };

  render() {
    const { errors, data } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
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
        <Button primary>Submit Request</Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;