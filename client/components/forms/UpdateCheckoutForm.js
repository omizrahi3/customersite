import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Message } from "semantic-ui-react";

class UpdateCheckoutForm extends React.Component {
  state = {
    data: {
      cardholderName: '',
      maskedNumber: '',
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
    this.props
        .submit(this.state.data)
  };

  render() {
    const { data, errors } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit}>
          {errors.server && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.server}</p>
            </Message>
          )}
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="title">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    placeholder="Name"
                    value={data.cardholderName}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="maskedNumber">Card Number</label>
                  <input
                    type="text"
                    id="maskedNumber"
                    name="maskedNumber"
                    placeholder="Card Number"
                    value={data.maskedNumber}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="expirationDate">Card Expiration</label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    placeholder="MM/YYYY"
                    value={data.expirationDate}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={data.cvv}
                    onChange={this.onChange}
                  />
                </Form.Field>

              </Grid.Column>

            </Grid.Row>

            <Grid.Row>
              <Button primary>Checkout</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

UpdateCheckoutForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default UpdateCheckoutForm;