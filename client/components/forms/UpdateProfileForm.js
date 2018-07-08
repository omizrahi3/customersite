import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Form, Button, Input, Select } from "semantic-ui-react";
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

class UpdateProfileForm extends React.Component {
  state = {
    data: {
      Firstname: '',
      Lastname: '',
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
    console.log('UpdateProfileForm did mount');
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
    const { Token, AppUserId } = this.props.user;
    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = Token;
    instance.post('http://www.qa.getchatwith.com/api/GetAppUserById', { AppUserId })
    .then(res => res.data.Response[0])
    .then(profile => {
      const date = new Date(profile.Birthdate);
      console.log(date);
      const dateArr = date.toString().split(' ');
      this.setState({
        data: {
          Firstname: profile.Firstname,
          Lastname: profile.Lastname,
          Gender: profile.Gender,
          Date: dateArr[2],
          Month: dateArr[1],
          Year: dateArr[3]
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
    console.log(data.value);
    const { value } = data;
    this.setState({
      ...this.state,
      data: { ...this.state.data, [data.name]: value }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props
      .submit(this.state.data)
  };

  validate = data => {
    const errors = {};
    if (!data.Firstname) errors.firstname = "Please Enter First Name";
    if (!data.Lastname) errors.lastname = "Please Enter Last Name";
    if (!data.Date || !data.Month || !data.Year) errors.birthdate = "Birthdate Required";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
        <Form size='large' onSubmit={this.onSubmit}>
          <Form.Field
            error={!!errors.firstname}
            width={6}
            id='firstname'
            control={Input}
            label='First Name *'
            placeholder=''
            name="Firstname"
            value={data.Firstname}
            onChange={this.onChange}
          />
          {errors.firstname && (
            <InlineError text={errors.firstname} />
          )}
          <Form.Field
            error={!!errors.lastname}
            width={6}
            id='lastname'
            control={Input}
            label='Last Name *'
            placeholder=''
            name="Lastname"
            value={data.Lastname}
            onChange={this.onChange}
          />
          {errors.lastname && (
            <InlineError text={errors.lastname} />
          )}
          <Form.Group>
            <Form.Field
              error={!!errors.birthdate}
              control={Select}
              width={4}
              selectOnBlur={false}
              label='Birthdate *'
              options={monthOptions}
              name="Month"
              value={data.Month}
              onChange={this.onChange2}
            />
            <Form.Field
              error={!!errors.birthdate}
              control={Select}
              width={4}
              selectOnBlur={false}
              label='Date'
              options={this.state.dateOptions}
              name="Date"
              value={data.Date}
              onChange={this.onChange2}
            />
            <Form.Field
              error={!!errors.birthdate}
              control={Select}
              width={4}
              selectOnBlur={false}
              label='Year'
              options={this.state.yearOptions}
              name="Year"
              value={data.Year}
              onChange={this.onChange2}
            />
          </Form.Group>
          {errors.birthdate && (
            <InlineError text={errors.birthdate} />
          )}
          <Button size='large' primary>Sign Up</Button>
        </Form>
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