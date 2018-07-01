import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image, Message, Input } from "semantic-ui-react";

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
    this.props.submit(this.state.data);
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
            <Form.Field
              disabled
              width={12}
              id='cardholderName'
              control={Input}
              label='CARD HOLDER NAME*'
              name="cardholderName"
              value={data.cardholderName}
            />
            <Form.Field
              disabled
              width={12}
              id='maskedNumber'
              control={Input}
              label='CARD NUMBER*'
              name="maskedNumber"
              value={data.maskedNumber}
            />
            <Button primary>PLACE ORDER</Button>
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