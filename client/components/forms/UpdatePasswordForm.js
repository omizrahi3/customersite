import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Input, Label } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class UpdateProfileForm extends React.Component {
  state = {
    data: {
      CurrentPassword: "",
      Password: "",
      PasswordConfirm: "",
    },
    errors: {}
  };

  componentDidMount() {
    console.log('UpdatePasswordForm did mount');
  }

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
      const { data } = this.state;
      this.props.submit(data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.CurrentPassword) errors.current = "Please Enter Current Password";
    if (!data.Password) errors.password = "Please Enter Password";
    if (!data.PasswordConfirm) errors.passwordconfirm = "Please Confirm Password";
    if (data.Password !== data.PasswordConfirm) {
      errors.password = "Password Does Not Match";
      errors.passwordconfirm = "Password Does Not Match";
    }
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Required Field</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <Form size='large' onSubmit={this.onSubmit}>

          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Current Password</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.current}
            type="password"
            id='current'
            control={Input}
            placeholder={errors.current}
            name="CurrentPassword"
            value={data.CurrentPassword}
            onChange={this.onChange}
          />
          {errors.current && (
            <InlineError text={errors.current} />
          )}

          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>New Password</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.password}
            type="password"
            id='password'
            control={Input}
            placeholder={errors.password}
            name="Password"
            value={data.Password}
            onChange={this.onChange}
          />
          {errors.password && (
            <InlineError text={errors.password} />
          )}

          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Confirm New Password</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.passwordconfirm}
            type="password"
            id='passwordConfirm'
            control={Input}
            placeholder={errors.passwordconfirm}
            name="PasswordConfirm"
            value={data.PasswordConfirm}
            onChange={this.onChange}
          />
          {errors.passwordconfirm && (
            <InlineError text={errors.passwordconfirm} />
          )}

          <Button style={{ background: "#12457b", height: "50px", width: "200px"}} primary>SAVE</Button>
        </Form>
      </div>
    );
  }
}

UpdateProfileForm.propTypes = {
  submit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(UpdateProfileForm);