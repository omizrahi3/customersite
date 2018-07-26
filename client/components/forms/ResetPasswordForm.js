import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Label } from "semantic-ui-react";
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
    if (!data.PasswordConfirm) errors.passwordconfirm = "Please Enter Password";
    if (data.Password !== data.PasswordConfirm) {
      errors.passwordconfirm = "Password Does Not Match";
    }
    return errors;
  };

  render() {
    const { errors, data } = this.state;

    return (
      <div>
        <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Required Field</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <Form onSubmit={this.onSubmit}>
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Password</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.password}
            type="password"
            id='password'
            control={Input}
            name="Password"
            value={data.Password}
            onChange={this.onChange}
          />
          {errors.password && (
            <InlineError text={errors.password} />
          )}
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Confirm Password</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.passwordconfirm}
            type="password"
            id='passwordConfirm'
            control={Input}
            name="PasswordConfirm"
            value={data.PasswordConfirm}
            onChange={this.onChange}
          />
          {errors.passwordconfirm && (
            <InlineError style={{margin: "0"}} text={errors.passwordconfirm} />
          )}
          <div style={{margin: "2em"}}></div>
          <Button style={{ background: "#12457b", height: "50px", width: "200px"}} primary>SUBMIT</Button>
        </Form>
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;