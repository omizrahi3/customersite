import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Select, Label, Image, Message, Input } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

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

class NewCheckoutForm extends React.Component {
  state = {
    data: {
      firstName: '',
      lastName:'',
      cardNumber: '',
      Date: "",
      Month: "",
      Year: "",
      cvv: ''
    },
    yearOptions: [],
    errors: {}
  };

  componentDidMount() {
    const years = [];
    for (let i = 2018; i <= 2030; i++) {
      const year = i.toString();
      const yearObj = {key: year, text: year, value: year};
      years.push(yearObj)
    }
    this.setState({ yearOptions: years });
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
    console.log('testing');
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      console.log('testing testing');
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.firstName) errors.firstName = "Please Enter First Name";
    if (!data.lastName) errors.lastName = "Please Enter Last Name";
    if (!data.cardNumber) errors.cardNumber = "Please Enter Valid Credit Card";
    if (!data.Month || !data.Year) errors.exp = "Please Enter Month and Year";
    if (!data.cvv) errors.cvv = "Please Enter Valid CVV";
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
        <Form onSubmit={this.onSubmit}>
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>First Name</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.firstName}
            width={6}
            id='firstName'
            control={Input}
            name="firstName"
            value={data.firstName}
            onChange={this.onChange}
          />
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Last Name</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.lastName}
            width={6}
            id='lastName'
            control={Input}
            name="lastName"
            value={data.lastName}
            onChange={this.onChange}
          />
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Card Number</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.cardNumber}
            width={6}
            id='cardNumber'
            control={Input}
            name="cardNumber"
            value={data.cardNumber}
            onChange={this.onChange}
          />
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Expiration Date</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Group>
            <Form.Field
              error={!!errors.exp}
              control={Select}
              selectOnBlur={false}
              options={monthOptions}
              name="Month"
              onChange={this.onChange2}
            />
            <Form.Field
              error={!!errors.exp}
              control={Select}
              selectOnBlur={false}
              options={this.state.yearOptions}
              name="Year"
              onChange={this.onChange2}
            />
          </Form.Group>
          <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>CVV</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.cvv}
            width={6}
            id='cvv'
            control={Input}
            name="cvv"
            value={data.cvv}
            onChange={this.onChange}
          />
          <Button style={{ background: "#12457b", height: "50px", width: "200px"}} primary>CONTINUE</Button>
        </Form>
        </div>
    );
  }
}

NewCheckoutForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default NewCheckoutForm;