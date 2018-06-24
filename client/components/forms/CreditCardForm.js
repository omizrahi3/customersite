import React, { Component } from 'react'
import PropTypes from "prop-types";
import axios from 'axios';
import { Dropdown, Form, Checkbox } from "semantic-ui-react";

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
      const options = [];
      const cardsHash = {};
      if (cards === undefined) {
        this.props.noCardAvailable();
      } else {
        cards.forEach(card => {
          cardsHash[card.uniqueNumberIdentifier] = card;
          options.push({
            key: card.createdAt,
            value: card.uniqueNumberIdentifier,
            text: `${card.cardType}-${card.last4}`
          })
        });
      }
      window.cardsHash = cardsHash;
      this.setState({ cardsOptions: options, cards: cardsHash });
    });
  }

  onChange = (e, data) => {
    this.props.onCardSelect(this.state.cards[data.value]);
  }

  checkbox = (e, data) => {
    this.props.checkboxSelection(data.checked);
  };

  render() {
    const { cardsOptions } = this.state;
    return (
      <Form>
        {this.state.cardsOptions.length > 0 && (
          <div>
            <Dropdown
              placeholder='Select Credit Card'
              selection
              options={cardsOptions}
              onChange={this.onChange}
            />
            <Checkbox
              label='Add New Card'
              onChange={this.checkbox}
            />
          </div>
        )}
      </Form>
    )
  }
}

CreditCardForm.propTypes = {
  AppUserId: PropTypes.string.isRequired,
  Token: PropTypes.string.isRequired,
  onCardSelect: PropTypes.func.isRequired,
  checkboxSelection: PropTypes.func.isRequired,
  noCardAvailable: PropTypes.func.isRequired
};

export default CreditCardForm
