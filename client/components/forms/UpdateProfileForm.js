import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import api from "../../api";
import { Form, Button, Input, Select, Label } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
  { key: 'n', text: 'No Answer', value: 'none' }
]

const monthOptions = [
  { key: '0', text: 'Jan', value: '00' },
  { key: '1', text: 'Feb', value: '01' },
  { key: '2', text: 'Mar', value: '02' },
  { key: '3', text: 'Apr', value: '03' },
  { key: '4', text: 'May', value: '04' },
  { key: '5', text: 'Jun', value: '05' },
  { key: '6', text: 'Jul', value: '06' },
  { key: '7', text: 'Aug', value: '07' },
  { key: '8', text: 'Sep', value: '08' },
  { key: '9', text: 'Oct', value: '09' },
  { key: '10', text: 'Nov', value: '10' },
  { key: '11', text: 'Dec', value: '11' }
]

class UpdateProfileForm extends React.Component {
  state = {
    data: {
      Firstname: '',
      Lastname: '',
      EmailAddress: '',
      Gender: '',
      Date: '',
      Month: '',
      Year: ''
    },
    errors: {},
    dateOptions: [],
    yearOptions: [],
  };

  componentDidMount() {
    // console.log('UpdateProfileForm did mount');
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
    const credentials = {
      Token: this.props.user.Token,
      data: {
        AppUserId: this.props.user.AppUserId
      }
    }
    api.user.fetchUser(credentials)
    .then(res => res[0])
    .then(profile => {
      // console.log(profile.Birthdate);

      if (profile.Gender === '') {
        profile.Gender = 'none';
      }

      const date = new Date(profile.Birthdate);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      const fixedDate = new Date(date.getTime() + userTimezoneOffset);

      const monthString = fixedDate.getMonth().toString();
      const month = monthString.length === 1 ? `0${monthString}` : monthString;

      const dayString = fixedDate.getDate().toString();
      const day = dayString.length === 1 ? `0${dayString}` : dayString;

      const year = fixedDate.getFullYear().toString();

      this.setState({
        data: {
          Firstname: profile.Firstname,
          Lastname: profile.Lastname,
          EmailAddress: profile.EmailAddress,
          Gender: profile.Gender,
          Date: day,
          Month: month,
          Year: year
        }
      });
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChange2 = (e, data) => {
    // console.log(data.value);
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
        const monthFix = parseInt(data.Month) + 1;
        data.Birthdate = `${data.Year}-${monthFix.toString()}-${data.Date}`;
      }
      if (data.Gender === 'none') {
        data.Gender = '';
      }
      this.props.submit(data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.Firstname) errors.firstname = "Please Enter First Name";
    if (!data.Lastname) errors.lastname = "Please Enter Last Name";
    if (!isEmail(data.EmailAddress)) errors.email = "Please Enter Valid Email";
    if (!data.Date || !data.Month || !data.Year) errors.birthdate = "Birthdate Required";
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
        <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>First Name</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <Form size='large' onSubmit={this.onSubmit}>
          <Form.Field
            error={!!errors.firstname}
            id='firstname'
            control={Input}
            placeholder=''
            name="Firstname"
            value={data.Firstname}
            onChange={this.onChange}
          />
          {errors.firstname && (
            <InlineError text={errors.firstname} />
          )}
          <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Last Name</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.lastname}
            id='lastname'
            control={Input}
            placeholder=''
            name="Lastname"
            value={data.Lastname}
            onChange={this.onChange}
          />
          {errors.lastname && (
            <InlineError text={errors.lastname} />
          )}

          <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Email Address</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.email}
            id='email'
            control={Input}
            name="EmailAddress"
            value={data.EmailAddress}
            onChange={this.onChange}
          />
          {errors.email && (
            <InlineError text={errors.email} />
          )}

          <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Birthdate</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Group>
            <Form.Field
              error={!!errors.birthdate}
              control={Select}
              selectOnBlur={false}
              options={monthOptions}
              name="Month"
              value={data.Month}
              onChange={this.onChange2}
            />
            <Form.Field
              error={!!errors.birthdate}
              control={Select}
              selectOnBlur={false}
              options={this.state.dateOptions}
              name="Date"
              value={data.Date}
              onChange={this.onChange2}
            />
            <Form.Field
              error={!!errors.birthdate}
              control={Select}
              selectOnBlur={false}
              options={this.state.yearOptions}
              name="Year"
              value={data.Year}
              onChange={this.onChange2}
            />
          </Form.Group>
          {errors.birthdate && (
            <InlineError text={errors.birthdate} />
          )}
          <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Gender</Label>
          </div>
          <Form.Field
            control={Select}
            selectOnBlur={false}
            options={options}
            name="Gender"
            value={data.Gender}
            placeholder='Select One'
            onChange={this.onChange2}
          />
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