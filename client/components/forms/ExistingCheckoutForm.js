import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image, Message } from "semantic-ui-react";

class ExistingCheckoutForm extends React.Component {
  state = {
    data: {
      uniqueNumberIdentifier: this.props.card.uniqueNumberIdentifier,
      cardholderName: this.props.card.cardholderName,
      cardType: this.props.card.cardType,
      maskedNumber: this.props.card.maskedNumber,
      expirationDate: this.props.card.expirationDate,
      PaymentToken: this.props.card.token
    },
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        uniqueNumberIdentifier: props.card.uniqueNumberIdentifier,
        cardholderName: props.card.cardholderName,
        cardType: props.card.cardType,
        maskedNumber: props.card.maskedNumber,
        expirationDate: props.card.expirationDate,
        PaymentToken: props.card.token
      }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props
        .submit(this.state.data)
        .catch(err => 
          this.setState({ errors: err })
        );
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
                    disabled
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    placeholder="Name"
                    value={data.cardholderName}
                  />
                </Form.Field>

                <Form.Field>
                  <label htmlFor="maskedNumber">Card Number</label>
                  <input
                    disabled
                    type="text"
                    id="maskedNumber"
                    name="maskedNumber"
                    placeholder="Card Number"
                    value={data.maskedNumber}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="cardType">Card Type</label>
                  <input
                    disabled
                    type="text"
                    id="cardType"
                    name="cardType"
                    placeholder="Card Type"
                    value={data.cardType}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="expirationDate">Card Type</label>
                  <input
                    disabled
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    placeholder="Card Expiration"
                    value={data.expirationDate}
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

ExistingCheckoutForm.propTypes = {
  submit: PropTypes.func.isRequired,
  card: PropTypes.shape({
    uniqueNumberIdentifier: PropTypes.string.isRequired,
    cardholderName: PropTypes.string.isRequired,
    maskedNumber: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired,
    expirationDate: PropTypes.string.isRequired
  }).isRequired
};

export default ExistingCheckoutForm;