import React, { Component } from 'react'
import PropTypes from "prop-types";
import axios from 'axios';
import { Dropdown, Form, Checkbox, Segment } from "semantic-ui-react";

class CreditCardForm extends Component {
  state = {
    cardsOptions: [],
    cards: {}
  }

  componentDidMount = () => {
    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.Token;
    instance.post('http://www.qa.getchatwith.com/api/GetAppUserCreditCards', { AppUserId: this.props.AppUserId })
    .then(res => res.data.Response.CreditCards)
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
