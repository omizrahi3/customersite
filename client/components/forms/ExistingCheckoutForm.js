import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Label, Segment, Message, Input } from "semantic-ui-react";

class ExistingCheckoutForm extends React.Component {
  state = {
    data: {
      uniqueNumberIdentifier: this.props.card.uniqueNumberIdentifier,
      cardholderName: this.props.card.cardholderName,
      cardType: this.props.card.cardType,
      maskedNumber: this.props.card.maskedNumber,
      expirationDate: this.props.card.expirationDate,
      PaymentToken: this.props.card.token
    }
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
    const { data } = this.state;

    return (
      <div>
        <div style={{paddingTop: "1em", paddingBottom: "1em"}}>
          <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Required Field</Label>
          <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
        </div>
        <Form onSubmit={this.onSubmit}>
        <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
            <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Full Name</Label>
            <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
          </div>
            <Form.Field
              disabled
              width={12}
              id='cardholderName'
              control={Input}
              name="cardholderName"
              value={data.cardholderName}
            />
            <div style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}>
              <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Card Number</Label>
              <Label style={{padding: "0", color: "red", background: "none", fontSize:"1.25em"}}>*</Label>
            </div>
            <Form.Field
              disabled
              width={12}
              id='maskedNumber'
              control={Input}
              name="maskedNumber"
              value={data.maskedNumber}
            />
            <Button style={{ background: "#12457b", height: "50px", width: "200px"}} primary>CONTINUE</Button>
        </Form>
        </div>
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