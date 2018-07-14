import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Menu, Header, List, Divider, Image } from "semantic-ui-react";
import api from "../../api";

const linkStyle = {
  textDecoration: 'underline'
};

const marginFix = {
  margin: "0"
};

const listStyle = {
  color: 'grey'
};

class PaymentGrid extends Component {
  state = {
    cardFetched: false,
    last4: '',
    expDate: '',
    cardImg: 'https://assets.braintreegateway.com/payment_method_logo/discover.png?environment=sandbox'
  }

  componentDidMount() {
    console.log('PaymentGrid did mount');
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
      this.setState({ cardFetched: true, expDate: `${res.CreditCards[0].expirationMonth}/${res.CreditCards[0].expirationYear}`, last4: res.CreditCards[0].last4, cardImg: res.CreditCards[0].imageUrl})
    })
  }

  render() {
    return (
      <div>
        <Menu style={marginFix} secondary>
          <Menu.Menu style={marginFix} position="left">
            <Header color='grey'>PAYMENT METHOD</Header>
          </Menu.Menu>
          <Menu.Menu style={marginFix} position="right">
          <List>
            <List.Item style={linkStyle} as='a'>Edit</List.Item>
          </List>
          </Menu.Menu>
        </Menu>
        <Divider style={marginFix} />
        {this.state.cardFetched && (
          <List>
            <Image src={this.state.cardImg} />
            <List.Item style={listStyle} color="grey">Ending in {this.state.last4}</List.Item>
            <List.Item style={listStyle} color="grey">Exp. {this.state.expDate}</List.Item>
          </List>
        )}
      </div>
    )
  }
}

PaymentGrid.propTypes = {
  user: PropTypes.object.isRequired
};

export default PaymentGrid