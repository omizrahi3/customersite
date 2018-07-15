import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import api from "../../api";
import { Form, Button, Input, Select, Label } from "semantic-ui-react";
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

class UpdateProfileForm extends React.Component {
  state = {
    data: {
      Fullname: '',
      Cardnumber: '',
      CVV: '',
      Month: '',
      Year: ''
    },
    errors: {},
    yearOptions: [],
  };

  componentDidMount() {
    console.log('UpdateProfileForm did mount');
    const years = [];
    for (let i = 2018; i <= 2030; i++) {
      const year = i.toString();
      const yearObj = {key: year, text: year, value: year};
      years.push(yearObj)
    }
    this.setState({ yearOptions: years});

    const credentials = {
      Token: this.props.user.Token,
      data: {
        AppUserId: this.props.user.AppUserId
      }
    }

    api.payment.fetchCards(credentials)
    .then(res => {
      console.log('over here');
      console.log(res.CreditCards[0]);
      const card = res.CreditCards[0];

      this.setState({
      data: {
        Fullname: card.cardholderName,
        Cardnumber: card.maskedNumber,
        CVV: '123',
        Month: card.expirationMonth,
        Year: card.expirationYear
      }
    });
    })
    .catch(err => {
      console.log('whoops');
    })

  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChange2 = (e, data) => {
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
      if (!!data.Month & !!data.Year) {
        data.ExpDate = `${data.Month}/${data.Year}`;
      }
      this.props.submit(data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.Fullname) errors.fullname = "Please Enter Full Name";
    if (!data.Cardnumber) errors.cardnumber = "Please Enter Card Number";
    if (!data.CVV) errors.cvv = "Please Enter CVV";
    if (!data.Month || !data.Year) errors.exp = "Expiration Date Required";
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
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Full Name</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <Form size='large' onSubmit={this.onSubmit}>
          <Form.Field
            error={!!errors.fullname}
            id='fullname'
            control={Input}
            placeholder=''
            name="Fullname"
            value={data.Fullname}
            onChange={this.onChange}
          />
          {errors.fullname && (
            <InlineError text={errors.fullname} />
          )}
          <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Card Number</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.cardnumber}
            id='cardnumber'
            control={Input}
            placeholder=''
            name="Cardnumber"
            value={data.Cardnumber}
            onChange={this.onChange}
          />
          {errors.cardnumber && (
            <InlineError text={errors.cardnumber} />
          )}

          <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>CVV</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
          <Form.Field
            error={!!errors.cvv}
            id='cvv'
            control={Input}
            placeholder=''
            name="CVV"
            value={data.CVV}
            onChange={this.onChange}
          />
          {errors.cvv && (
            <InlineError text={errors.cvv} />
          )}
          
          <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
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
              value={data.Month}
              onChange={this.onChange2}
            />
            <Form.Field
              error={!!errors.exp}
              control={Select}
              selectOnBlur={false}
              options={this.state.yearOptions}
              name="Year"
              value={data.Year}
              onChange={this.onChange2}
            />
          </Form.Group>
          {errors.exp && (
            <InlineError text={errors.exp} />
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