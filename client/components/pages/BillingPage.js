import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Segment, Card, Header, Button, Form, Message, Icon } from 'semantic-ui-react';
import NewCheckoutForm from '../forms/NewCheckoutForm';
import ExistingCheckoutForm from '../forms/ExistingCheckoutForm';
import CreditCardForm from '../forms/CreditCardForm';
import { checkoutExisting, checkoutNew, checkoutUpdate, checkoutGuest } from '../../actions/checkoutActions';

class BillingPage extends Component {
  state = {
    user: {},
    card: null,
    loggedIn: null,
    subtotal: 0,
    tax: 0,
    noCard: null,
    updateCard: false,
    loading: '',
    success: false,
    data: {
      guestEmail: ''
    },
    guestEligible: ''
  }

  componentDidMount() {
    console.log('CartPage did mount');
    const { user } = this.props;
    let guestEligible = 'true';

    if (Object.keys(user).length === 0 && user.constructor === Object) {
      user.loggedIn = false;
    } else {
      user.loggedIn = true;
    }
    let subtotal = 0;
    this.props.cart.map(item => {
      if (item.ProductDescription === 'Live Chat' || item.ProductDescription === 'Feed') {
        guestEligible = 'false';
      }
      subtotal += item.WebPrice;
    })
    if (guestEligible === 'true') {
      console.log('guest eligible');
    } else {
      console.log('not guest eligible');
    }
    this.setState({subtotal, user, guestEligible});
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  noCardAvailable = () => this.setState({ noCard: true });

  checkboxSelection = (checked) => {
    this.setState({ updateCard: checked })
  }

  onCardSelect = card => this.setState({ card });

  submitNewGuest = (data) => {
    console.log('submitNewGuest');
    console.log(data);
    this.setState({loading: 'true'});
    const checkoutData = {
      EmailAddress: this.state.data.guestEmail,
      CreditCard: {
        cardholderName: `${data.firstName} ${data.lastName}`,
        cvv: data.cvv,
        expirationDate: `${data.expMonth}/${data.expYear}`,
        number: data.cardNumber
      },
      Products: []
    };
    this.props.cart.map(item => {
      if (item.ProductDescription === 'Feed') {
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
          "FeedChatSessionId": item.FeedChatSessionId
        }
        checkoutData.Products.push(product);
      }
    });
    console.log(checkoutData);
    this.props.checkoutGuest(checkoutData)
      .then(() => this.setState({ loading: 'false', success: true }))
      .catch(() => this.setState({ loading: 'false', success: false }));
  }

  submitNew = (data) => {
    console.log('submitNew');
    this.setState({loading: 'true'});
    console.log(data);
    const checkoutData = {
      AppUserId: this.props.user.AppUserId,
      NameOnCard: `${data.firstName} ${data.lastName}`,
      Cvv: data.cvv,
      ExpirationDate: `${data.Month}/${data.Year}`,
      CardNumber: data.cardNumber,
      Products: []
    };

    this.props.cart.map(item => {
      if (item.ProductDescription === 'Feed') {
        console.log('FEED')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
          "FeedChatSessionId": item.FeedChatSessionId
        }
        checkoutData.Products.push(product);
      }
      if (item.ProductDescription === 'Video Message') {
        console.log('VIDEO MESSAGE')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "ProductName": item.VideoMessage,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
        }
        checkoutData.Products.push(product);
      }
      if (item.ProductDescription === 'Live Chat') {
        console.log('LIVE CHAT')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
          "DateMapperId": item.DateMapperId,
          "SessionId": "chat"
        }
        checkoutData.Products.push(product);
      }
    })
    const checkoutObject = {
      Token: this.props.user.Token,
      checkout: checkoutData
    }
    console.log('READY');
    console.log(checkoutObject);
    this.props.checkoutNew(checkoutObject)
      .then(() => this.setState({ loading: 'false', success: true }))
      .catch(() => this.setState({ loading: 'false', success: false }));
  }

  submitExisting = (data) => {
    console.log('submitExisting');
    this.setState({loading: 'true'});

    const checkoutData = {
      AppUserId: this.props.user.AppUserId,
      PaymentToken: data.PaymentToken,
      Products: []
    };

    this.props.cart.map(item => {
      if (item.ProductDescription === 'Feed') {
        console.log('FEED')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
          "FeedChatSessionId": item.FeedChatSessionId
        }
        checkoutData.Products.push(product);
      } 
      if (item.ProductDescription === 'Video Message') {
        console.log('VIDEO MESSAGE')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "ProductName": item.VideoMessage,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
        }
        checkoutData.Products.push(product);
      }
      if (item.ProductDescription === 'Live Chat') {
        console.log('LIVE CHAT')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
          "DateMapperId": item.DateMapperId,
          "SessionId": "chat"
        }
        checkoutData.Products.push(product);
      }
    })
    const checkoutObject = {
      Token: this.props.user.Token,
      checkout: checkoutData
    }
    console.log('READY');
    console.log(checkoutObject);
    this.props.checkoutExisting(checkoutObject)
      .then(() => this.setState({ loading: 'false', success: true }))
      .catch(() => this.setState({ loading: 'false', success: false }));
  }

  submitUpdate = (data) => {
    console.log('submitUpdate');
    console.log(data);

    this.setState({loading: 'true'});
    console.log(data);
    const checkoutData = {
      AppUserId: this.props.user.AppUserId,
      CreditCard: {
        cardholderName: `${data.firstName} ${data.lastName}`,
        cvv: data.cvv,
        expirationDate: `${data.Month}/${data.Year}`,
        number: data.cardNumber
      },
      Products: []
    };
    this.props.cart.map(item => {
      if (item.ProductDescription === 'Feed') {
        console.log('FEED')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
          "FeedChatSessionId": item.FeedChatSessionId
        }
        checkoutData.Products.push(product);
      } 
      if (item.ProductDescription === 'Video Message') {
        console.log('VIDEO MESSAGE')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "ProductName": item.VideoMessage,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
        }
        checkoutData.Products.push(product);
      }
      if (item.ProductDescription === 'Live Chat') {
        console.log('LIVE CHAT')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
          "DateMapperId": item.DateMapperId,
          "SessionId": "chat"
        }
        checkoutData.Products.push(product);
      }
    });
    const checkoutObject = {
      Token: this.props.user.Token,
      checkout: checkoutData
    };
    console.log('READY');
    console.log(checkoutObject);
    this.props.checkoutUpdate(checkoutObject)
      .then(() => this.setState({ loading: 'false', success: true }))
      .catch(() => this.setState({ loading: 'false', success: false }));
  }

  guestGrid = () => (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Segment basic secondary>
            <Header as='h3'>
              <Header.Content>
                CHECK OUT AS GUEST
                <Header.Subheader>
                  Check out as a guest and we will email you your receipt to the email address below.
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Form>
              <Form.Field>
                  <label htmlFor="email">Email Address*</label>
                  <input
                    type="text"
                    id="guestEmail"
                    name="guestEmail"
                    placeholder=""
                    onChange={this.onChange}
                  />
              </Form.Field>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment basic secondary>
            <Header as='h3'>
              <Header.Content>
                SIGN IN OR SIGNUP
                <Header.Subheader>
                  Sign in for a faster check out and to download the ChatWith App.
                </Header.Subheader>
              </Header.Content>
            </Header>
            <div>
              <Button color='blue' as={Link} to='/login'>SIGN IN</Button>
              <Button color='blue' as={Link} to='/signup'>SIGN UP</Button>
            </div>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  guestBillingInfo = () => (
    <Grid>
      <Grid.Row>
        <Header>BILLING INFORMATION</Header>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <NewCheckoutForm submit={this.submitNewGuest} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  userBillingInfo = () => (
    <Grid>
      <Grid.Row>
        <Header>BILLING INFORMATION</Header>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <CreditCardForm noCardAvailable={this.noCardAvailable} checkboxSelection={this.checkboxSelection} onCardSelect={this.onCardSelect} AppUserId={this.state.user.AppUserId} Token={this.state.user.Token}/>
          {this.state.card && !this.state.updateCard && (
            <div>
              <ExistingCheckoutForm submit={this.submitExisting} card={this.state.card} />
            </div>
          )}
          {this.state.card && this.state.updateCard && (
            <div>
              <NewCheckoutForm submit={this.submitUpdate} />
            </div>
          )}
          {!this.state.card && this.state.noCard && (
            <div>
              <h1>Add Card</h1>
              <NewCheckoutForm submit={this.submitNew} />
            </div>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  render() {
    const { cart } = this.props;
    const { loading, success, guestEligible } = this.state;
    return (
      <div>
        {loading === 'true' && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Checkout In Progress</Message.Header>
          </Message>
        )}
        {loading === 'false' &&
        success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Purchase Complete. Confirmation Email Sent.
              </Message.Header>
              <Link to="/talent">Browse More Talents</Link>
            </Message.Content>
          </Message>
        )}
        {loading === 'false' &&
        !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Purchase Failed. Check Card And Try Again</Message.Header>
            </Message.Content>
          </Message>
        )}
        <Grid>
          <Grid.Column width={12}>
            <Segment inverted color='blue'>{cart.length} Items</Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment inverted color='teal'>Have Questions? support@getchatwith.com</Segment>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={12}>
            {!this.state.user.loggedIn && guestEligible === 'true' &&  (
              <div>
                {this.guestGrid()}
                {this.guestBillingInfo()}
              </div>
            )}
            {!this.state.user.loggedIn && guestEligible === 'false' &&  (
              <div>
                <Message negative icon>
                  <Icon name="warning sign" />
                  <Message.Content>
                    <Message.Header>Cart not eligible for Guest Checkout.</Message.Header>
                  </Message.Content>
                </Message>
                <Segment basic secondary>
                  <Header as='h3'>
                    <Header.Content>
                      SIGN IN OR SIGNUP
                      <Header.Subheader>
                        Sign in for a faster check out and to download the ChatWith App.
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                  <div>
                    <Button color='blue' as={Link} to='/login'>SIGN IN</Button>
                    <Button color='blue' as={Link} to='/signup'>SIGN UP</Button>
                  </div>
                </Segment>
              </div>
            )}
            {this.state.user.loggedIn && (
              <div>
                {this.userBillingInfo()}
              </div>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Header as='h2' color='grey'>
                  ORDER SUMMARY
                </Header>
              </Card.Content>
              <Card.Content>
              <Grid color='grey'>
                <Grid.Row>
                  <Grid.Column width={8}>
                    SUBTOTAL
                  </Grid.Column>
                  <Grid.Column width={8}>
                    ${this.state.subtotal.toFixed(2)}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    ESTIMATED TAX
                  </Grid.Column>
                  <Grid.Column width={8}>
                    ${this.state.tax}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    TOTAL
                  </Grid.Column>
                  <Grid.Column width={8}>
                    ${(this.state.subtotal + this.state.tax).toFixed(2)}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    )
  }
}

BillingPage.propTypes = {
  checkoutGuest: PropTypes.func.isRequired,
  checkoutNew: PropTypes.func.isRequired,
  checkoutExisting: PropTypes.func.isRequired,
  checkoutUpdate: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    cart: state.cart
  };
}

export default connect(mapStateToProps, { checkoutGuest, checkoutNew, checkoutExisting, checkoutUpdate })(BillingPage);