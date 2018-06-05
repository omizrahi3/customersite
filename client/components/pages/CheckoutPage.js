import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const expOptions = [
  { key: '1', text: 'January', value: 'january' },
  { key: '2', text: 'February', value: 'february' },
]

class CheckoutPage extends Component {
  state = {
    data: {
      FullName: "",
      CardNumber: "",
      CvcNumber: "",
      ExpMonth: "",
      ExpYear: ""
    },
    ProductTypeId: this.props.location.state.ProductTypeId,
    ProductName: this.props.location.state.ProductName,
    Price: this.props.location.state.Price,
    TalentId: this.props.location.state.TalentId,
    keys: [],
    creditcards: {}
  }

  componentDidMount() {
    console.log('CheckoutPage did mount')
    const { productid } = this.props.match.params;
    const { Token, AppUserId } = this.props.user;
    console.log(Token);
    console.log(AppUserId);
    console.log(this.state)

    // const instance = axios.create({timeout: 3000});
    // instance.defaults.headers.common['token'] = this.props.user.Token;
    // instance.post('/api/api/GetAppUserCreditCards', { AppUserId })
    // .then(res => res.data.Response)
    // .then( cards => {
    //   console.log(cards);
    //   if (cards.length === 0) {
    //     console.log('no cards');
    //   }
    // })
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
  });

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.data);
    const { productid } = this.props.match.params;
    const { Token, AppUserId } = this.props.user;
    const expDate = `${this.state.data.ExpMonth}/${this.state.data.ExpYear}`;
    const data = {
      "ProductOptionId": this.props.match.params.productid,
      "ProductName": this.state.ProductName,
      "AppUserId": AppUserId,
      "SessionId":"",
      "Amount": this.state.Price,
      "TalentId": this.state.TalentId,
      "NameOnCard": this.state.data.FullName,
      "Cvv": this.state.data.CvcNumber,
      "ExpirationDate": expDate,
      "CardNumber": this.state.data.CardNumber
    };
    console.log(data);
    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.user.Token;
    instance.post('/api/api/CreateWebTransactionNew', data)
    .then(res => res.data.Response)
    .then( response => {
      console.log(response);
    })
  };



  renderCreditCards = keys => keys.map(key => {
    return  (
      <div>
        you have credit cards
      </div>
    )
  })

  render() {
    const { data } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            name="FullName"
            placeholder="Name as it appears on card"
            value={data.FullName}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Card Number</label>
          <input
            type="text"
            id="card"
            name="CardNumber"
            placeholder="Card #"
            value={data.CardNumber}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>CVC</label>
          <input
            type="text"
            id="cvc"
            name="CvcNumber"
            placeholder="CVC"
            value={data.CvcNumber}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Month</label>
          <input
            type="text"
            id="month"
            name="ExpMonth"
            placeholder="Month"
            value={data.ExpMonth}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Year</label>
          <input
            type="text"
            id="year"
            name="ExpYear"
            placeholder="Year"
            value={data.ExpYear}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Purchase</Button>
      </Form>
    )
  }
}

CheckoutPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productid: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(CheckoutPage);