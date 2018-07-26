import React, { Component } from 'react'
import PropTypes from "prop-types";
import api from "../../api";

class CreditCardForm extends Component {
  state = {
    cardsOptions: [],
    cards: {}
  }

  componentDidMount = () => {
    const credentials = {
      Token: this.props.Token,
      data: {
        AppUserId: this.props.AppUserId
      }
    }
    api.payment.fetchCards(credentials)
    .then(res => res.CreditCards)
    .then(cards => {
      if (cards === undefined) {
        this.props.noCardAvailable();
      } else {
        this.props.onCardSelect(cards[0]);
      }
    });
  }

  onChange = (e, data) => {
    this.props.onCardSelect(this.state.cards[data.value]);
  }

  render() {
    return (null)
  }
}

CreditCardForm.propTypes = {
  AppUserId: PropTypes.string.isRequired,
  Token: PropTypes.string.isRequired,
  onCardSelect: PropTypes.func.isRequired,
  noCardAvailable: PropTypes.func.isRequired
};

export default CreditCardForm
