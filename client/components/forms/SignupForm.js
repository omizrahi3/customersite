import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Form, Button, Label, Input, Select } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' }
]

const monthOptions = [
  { key: '1', text: 'Jan', value: '01' },
  { key: '2', text: 'Feb', value: '02' },
  { key: '3', text: 'Mar', value: '03' },
  { key: '4', text: 'Apr', value: '04' },
  { key: '5', text: 'May', value: '05' },
  { key: '6', text: 'Jun', value: '06' },
  { key: '7', text: 'Jul', value: '07' },
  { key: '8', text: 'Aug', value: '08' },
  { key: '9', text: 'Sep', value: '09' },
  { key: '10', text: 'Oct', value: '10' },
  { key: '11', text: 'Nov', value: '11' },
  { key: '12', text: 'Dec', value: '12' }
]

class SignupForm extends React.Component {
  state = {
    data: {
      EmailAddress: "",
      Firstname: "",
      Lastname: "",
      Gender: "",
      Password: "",
      PasswordConfirm: "",
      Date: "",
      Month: "",
      Year: ""
    },
    dateOptions: [],
    yearOptions: [],
    loading: false,
    errors: {}
  };

  componentDidMount() {
    const years = [];
    const dates = [];
    for (let i = 1; i <= 31; i++) {
      const date = i.toString();
      const dateObj = {key: date, text: `${date.length === 1 ? '0':''}${date}`, value: `${date.length === 1 ? '0':''}${date}`}
      dates.push(dateObj)
    }
    for (let i = 1950; i <= 2000; i++) {
      const year = i.toString();
      const yearObj = {key: year, text: year, value: year};
      years.push(yearObj)
    }
    this.setState({dateOptions: dates, yearOptions: years});
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChange2 = (e, data) => {
    console.log(data.value);
    const { value } = data;
    this.setState({
      ...this.state,
      data: { ...this.state.data, [data.name]: value }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const { data } = this.state;
      if (!!data.Date && !!data.Month & !!data.Year) {
        data.Birthdate = `${data.Year}-${data.Month}-${data.Date}`;
      }
      this.props.submit(data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.Firstname) errors.firstname = "Please Enter First Name";
    if (!data.Lastname) errors.lastname = "Please Enter Last Name";
    if (!isEmail(data.EmailAddress)) errors.email = "Please Enter Valid Email";
    if (!data.Password) errors.password = "Please Enter Password";
    if (!data.PasswordConfirm) errors.passwordconfirm = "Please Confirm Password";
    if (data.Password !== data.PasswordConfirm) {
      errors.password = "Password Does Not Match";
      errors.passwordconfirm = "Password Does Not Match";
    }
    if (!data.Date || !data.Month || !data.Year) errors.birthdate = "Birthdate Required";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    const { signupSuccess } = this.props;

    return (
      <div>
        <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Required Field</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
          <Link to="/login">Already a member? Login</Link>
        </div>
        <Form onSubmit={this.onSubmit}>
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Firstname</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.firstname}
            disabled={signupSuccess}
            id='firstname'
            control={Input}
            name="Firstname"
            value={data.Firstname}
            onChange={this.onChange}
          />
          {errors.firstname && (
            <InlineError text={errors.firstname} />
          )}
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Lastname</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.lastname}
            disabled={signupSuccess}
            id='lastname'
            control={Input}
            name="Lastname"
            value={data.Lastname}
            onChange={this.onChange}
          />
          {errors.lastname && (
            <InlineError text={errors.lastname} />
          )}
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Email Address</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.email}
            disabled={signupSuccess}
            id='email'
            control={Input}
            name="EmailAddress"
            value={data.EmailAddress}
            onChange={this.onChange}
          />
          {errors.email && (
            <InlineError text={errors.email} />
          )}
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Password</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.password}
            disabled={signupSuccess}
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
            disabled={signupSuccess}
            type="password"
            id='passwordConfirm'
            control={Input}
            name="PasswordConfirm"
            value={data.PasswordConfirm}
            onChange={this.onChange}
          />
          {errors.passwordconfirm && (
            <InlineError text={errors.passwordconfirm} />
          )}
          <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Birthdate</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Group>
            <Form.Field
              error={!!errors.birthdate}
              disabled={signupSuccess}
              control={Select}
              selectOnBlur={false}
              options={monthOptions}
              name="Month"
              onChange={this.onChange2}
            />
            <Form.Field
              error={!!errors.birthdate}
              disabled={signupSuccess}
              control={Select}
              selectOnBlur={false}
              options={this.state.dateOptions}
              name="Date"
              onChange={this.onChange2}
            />
            <Form.Field
              error={!!errors.birthdate}
              disabled={signupSuccess}
              control={Select}
              selectOnBlur={false}
              options={this.state.yearOptions}
              name="Year"
              onChange={this.onChange2}
            />
          </Form.Group>
          {errors.birthdate && (
            <InlineError text={errors.birthdate} />
          )}
          <Form.Field
            disabled={signupSuccess}
            control={Select}
            width={6}
            selectOnBlur={false}
            label='Gender'
            options={options}
            name="Gender"
            onChange={this.onChange2}
          />
          <Button style={{ background: "#12457b", height: "50px", width: "200px"}} primary>REGISTER</Button>
        </Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signupSuccess: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired
};

export default SignupForm;