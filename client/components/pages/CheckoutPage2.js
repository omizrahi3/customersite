import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Checkbox } from "semantic-ui-react";
import CreditCardForm from '../forms/CreditCardForm';
import ExistingCheckoutForm from '../forms/ExistingCheckoutForm';
import UpdateCheckoutForm from '../forms/UpdateCheckoutForm';
import NewCheckoutForm from '../forms/NewCheckoutForm';
import { checkoutExisting, checkoutNew, checkoutUpdate } from '../../actions/checkoutActions';

class CheckoutPage2 extends Component {
  state = {
    card: null,
    noCard: null,
    updateCard: false,
    addNewCard: false,
    ProductName: this.props.location.state.ProductName,
    ProductOptionId: this.props.location.state.ProductOptionId,
    Amount: this.props.location.state.Price,
    talentid: this.props.location.state.talentid
  }

  componentDidMount = () => {
    const { productid } = this.props.match.params;
    console.log(this.props.user);
    console.log(this.props.location.state);
  }

  noCardAvailable = () => this.setState({ noCard: true });

  onCardSelect = card => this.setState({ card });

  submitExisting = (data) => {
    console.log('submitExisting');
    const checkoutData = {
      Token: this.props.user.Token,
      checkout: {
        ProductOptionId: this.props.match.params.productid,
        ProductName: this.state.ProductName,
        AppUserId: this.props.user.AppUserId,
        SessionId: '',
        Amount: this.state.Amount.toString(),
        TalentId: this.state.talentid,
        PaymentToken: data.PaymentToken,
        DateMapperId: ''
      }
    }
    return this.props.checkoutExisting(checkoutData).then(() => this.props.history.push('/dashboard'));
  }

  submitUpdate = (data) => {
    console.log('submitUpdate');
    const checkoutData = {
      Token: this.props.user.Token,
      checkout: {
        ProductOptionId: this.props.match.params.productid,
        ProductName: this.state.ProductName,
        AppUserId: this.props.user.AppUserId,
        SessionId: '',
        Amount: this.state.Amount.toString(),
        TalentId: this.state.talentid,
        CreditCard: {
          cardholderName: data.cardholderName,
          cvv: data.cvv,
          expirationDate: data.expirationDate,
          number: data.maskedNumber
        },
        DateMapperId: ""
      }
    }
    console.log(checkoutData);
    return this.props.checkoutUpdate(checkoutData).then(() => this.props.history.push('/dashboard'));
  }

  submitNew = (data) => {
    console.log('submitNew');
    console.log(data);
    const checkoutData = {
      Token: this.props.user.Token,
      checkout: {
        ProductOptionId: this.props.match.params.productid,
        ProductName: this.state.ProductName,
        AppUserId: this.props.user.AppUserId,
        SessionId: '',
        Amount: this.state.Amount.toString(),
        TalentId: this.state.talentid,
        NameOnCard: data.cardholderName,
        Cvv: data.cvv,
        ExpirationDate: data.expirationDate,
        CardNumber: data.maskedNumber,
        DateMapperId: ''
      }
    }
    return this.props.checkoutNew(checkoutData).then(() => this.props.history.push('/dashboard'));
  }

  checkboxSelection = (checked) => {
    this.setState({ updateCard: checked })
  }

  render() {
    const { AppUserId, Token } = this.props.user;
    return (
      <Segment.Group>
        <Segment>
          <h1>Your Product</h1>
        </Segment>
        <Segment>
          <CreditCardForm noCardAvailable={this.noCardAvailable} checkboxSelection={this.checkboxSelection} onCardSelect={this.onCardSelect} AppUserId={AppUserId} Token={Token}/>

          {this.state.card && !this.state.updateCard && (
            <div>
              <h1>Select Card</h1>
              <ExistingCheckoutForm submit={this.submitExisting} card={this.state.card} />
            </div>
          )}
          {this.state.card && this.state.updateCard && (
            <div>
              <h1>Update Card</h1>
              <UpdateCheckoutForm submit={this.submitUpdate} />
            </div>
          )}
          {!this.state.card && this.state.noCard && (
            <div>
              <h1>Add Card</h1>
              <NewCheckoutForm submit={this.submitNew} />
            </div>
          )}
        </Segment>
      </Segment.Group>
    )
  }
}

CheckoutPage2.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productid: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  checkoutExisting: PropTypes.func.isRequired,
  checkoutNew: PropTypes.func.isRequired,
  checkoutUpdate: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { checkoutExisting, checkoutNew, checkoutUpdate })(CheckoutPage2);
