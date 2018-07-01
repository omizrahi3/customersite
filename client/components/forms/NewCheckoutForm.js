import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image, Message, Input } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class NewCheckoutForm extends React.Component {
  state = {
    data: {
      firstName: '',
      lastName:'',
      cardNumber: '',
      expMonth: '',
      expYear: '',
      expirationDate: '',
      cvv: ''
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
      this.setState({ loading: true });
      this.props.submit(this.state.data)
      .catch(err => 
        this.setState({ errors: err })
      );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.firstName) errors.firstName = "Please Enter First Name";
    if (!data.lastName) errors.lastName = "Please Enter Last Name";
    if (!data.cardNumber) errors.cardNumber = "Please Enter Valid Credit Card";
    if (!data.expMonth) errors.expMonth = "Please Enter Valid Month";
    if (!data.expYear) errors.expYear = "Please Enter Valid Year";
    if (!data.cvv) errors.cvv = "Please Enter Valid CVV";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <Segment basic secondary>
        <Form onSubmit={this.onSubmit}>
          {errors.server && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.server}</p>
            </Message>
          )}
          <Form.Group>
            <Form.Field
              error={!!errors.firstName}
              width={6}
              id='firstName'
              control={Input}
              label='FIRST NAME*'
              placeholder={errors.firstName}
              name="firstName"
              value={data.firstName}
              onChange={this.onChange}
            />
            <Form.Field
              error={!!errors.lastName}
              width={6}
              id='lastName'
              control={Input}
              label='LAST NAME*'
              placeholder={errors.lastName}
              name="lastName"
              value={data.lastName}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Field
            error={!!errors.cardNumber}
            width={12}
            id='cardNumber'
            control={Input}
            label='CARD NUMBER*'
            placeholder={errors.cardNumber}
            name="cardNumber"
            value={data.cardNumber}
            onChange={this.onChange}
          />
          <Form.Group>
            <Form.Field
              error={!!errors.expMonth}
              width={4}
              id='expMonth'
              control={Input}
              label='EXP MONTH*'
              placeholder={errors.expMonth}
              name="expMonth"
              value={data.expMonth}
              onChange={this.onChange}
            />
            <Form.Field
              error={!!errors.expYear}
              width={4}
              id='expYear'
              control={Input}
              label='EXP YEAR*'
              placeholder={errors.expYear}
              name="expYear"
              value={data.expYear}
              onChange={this.onChange}
            />
            <Form.Field
              error={!!errors.cvv}
              width={4}
              id='cvv'
              control={Input}
              label='CVV*'
              placeholder={errors.cvv}
              name="cvv"
              value={data.cvv}
              onChange={this.onChange}
            />
          </Form.Group>
          <Button primary>PLACE ORDER</Button>
        </Form>
      </Segment>
    );
  }
}

NewCheckoutForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default NewCheckoutForm;