import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Input, Label } from "semantic-ui-react";
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
      <div>
        <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Required Field</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Email</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <Form size='large' onSubmit={this.onSubmit}>
          <Form.Field
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