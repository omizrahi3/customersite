import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Form, Button, Input, Label } from "semantic-ui-react";
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
      <div>
        <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Required Field</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
          <Link to="/signup">Not a member? Register</Link>
        </div>
        <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Email Address</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <Form onSubmit={this.onSubmit}>
          <Form.Field
            disabled={loggedIn}
            error={!!errors.email}
            type="email"
            id='email'
            control={Input}
            placeholder=''
            name="EmailAddress"
            value={data.EmailAddress}
            onChange={this.onChange}
          />
          {errors.email && (
            <InlineError text={errors.email} />
          )}
          <div style={{paddingTop: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Password</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            disabled={loggedIn}
            error={!!errors.password}
            type="password"
            id='password'
            control={Input}
            placeholder=''
            name="Password"
            value={data.Password}
            onChange={this.onChange}
          />
          {errors.password && (
            <InlineError text={errors.password} />
          )}
          <Button size="large" style={{ marginTop: "20px", background: "#12457b", width: "60%"}} primary>LOGIN</Button>
          <div style={{paddingTop: "1em"}}>
            <Link to="/forgot_password">Forgot Password?</Link>
          </div>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired
};

export default LoginForm;