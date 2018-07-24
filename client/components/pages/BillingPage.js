import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Segment, Header, Button, Form, Message, Icon, Menu, Divider, Label, Checkbox } from 'semantic-ui-react';
import TopGrid from '../grids/TopGrid';
import NewCheckoutForm from '../forms/NewCheckoutForm';
import ExistingCheckoutForm from '../forms/ExistingCheckoutForm';
import CreditCardForm from '../forms/CreditCardForm';
import { checkoutExisting, checkoutNew, checkoutUpdate, checkoutGuest } from '../../actions/checkoutActions';

const marginFix = {
  margin: "0"
};

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
      guestEligible === 'false'
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
        expirationDate: `${data.Month}/${data.Year}`,
        number: data.cardNumber
      },
      Products: []
    };
    this.props.cart.map(item => {
      if (item.ProductDescription === 'Video Message') {
        console.log('VIDEO MESSAGE')
        const product = {
          "ProductOptionId": item.ProductOptionId,
          "ProductName": item.VideoMessage,
          "Amount": item.WebPrice,
          "TalentId": item.TalentId,
          "ProductTypeId": "60E282C60E484A38A84BB2C24E590A0A"
        }
        checkoutData.Products.push(product);
      }
    });
    console.log(checkoutData);
    window.checkoutData = checkoutData;
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

  checkout = () => {
    console.log('checkout');
    console.log(this.state.card);
  }

  guestGrid = () => (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Segment style={{height: "260px"}} basic secondary>
            <Header color="grey" as='h3'>
                CHECK OUT AS GUEST
                <Header.Subheader>
                  Check out as a guest and we will email you your receipt to the email address below.
                </Header.Subheader>
            </Header>
            <Form>
              <div style={{paddingTop: "0", paddingBottom: "0.5em"}}>
                <Label style={{padding: "0", background: "none", fontSize:"1.15em"}}>Email Address</Label>
                <Label style={{padding: "0", color: "grey", background: "none", fontSize:"1.25em"}}>*</Label>
              </div>
              <Form.Field>
                <input
                  type="text"
                  id="guestEmail"
                  name="guestEmail"
                  placeholder=""
                  onChange={this.onChange}
                />
              </Form.Field>
            </Form>
            <Checkbox style={{paddingTop: "10px"}} label={<label style={{color:"grey"}}>Sign me up to receive ChatWith offers, promos, and other commercial messages. My request confirms my acceptance of ChatWith Privacy Policy. I can unsubscribe at any time.</label>} />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment style={{height: "260px"}} basic secondary>
            <Header style={{color:"grey"}} as='h3'>
                SIGN IN OR SIGNUP
                <Header.Subheader>
                  Sign in for a faster check out and to download the ChatWith App.
                </Header.Subheader>
            </Header>
            <Button style={{width: "100%", background: "#12457b"}} as={Link} to='/login' primary>SIGN IN</Button>
            <div style={{paddingTop: "10px", textAlign:"center", textDecoration: "underline"}}>
              <a href="/signup">Sign Up</a>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
            </div>​
            <Segment basic secondary></Segment>
            <Segment basic secondary></Segment>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  guestBillingInfo = () => (
    <div>
      <Menu style={marginFix} secondary>
        <Menu.Menu style={marginFix} position="left">
          <Header color='grey'>BILLING INFORMATION</Header>
        </Menu.Menu>
      </Menu>
      <Divider style={marginFix} />
      <Segment style={{margin: "0"}} basic secondary>
        <NewCheckoutForm submit={this.submitNewGuest} />
      </Segment>
    </div>
  )

  userBillingGrid = () => (
    <div>
      <Menu style={marginFix} secondary>
        <Menu.Menu style={marginFix} position="left">
          <Header color='grey'>BILLING INFORMATION</Header>
        </Menu.Menu>
      </Menu>
      <Divider style={marginFix} />
      <CreditCardForm noCardAvailable={this.noCardAvailable} checkboxSelection={this.checkboxSelection} onCardSelect={this.onCardSelect} AppUserId={this.state.user.AppUserId} Token={this.state.user.Token}/>
      {this.state.card && !this.state.updateCard && (
        <Segment style={{margin: "0"}} basic secondary>
          <ExistingCheckoutForm submit={this.submitExisting} card={this.state.card} />
        </Segment>
      )}
      {!this.state.card && this.state.noCard && (
        <Segment style={{margin: "0"}} basic secondary>
          <NewCheckoutForm submit={this.submitNew} />
        </Segment>
      )}
    </div>
  )

  userBillingInfo = () => (
    <Grid>
      <Grid.Row>
        <Header>BILLING INFORMATION</Header>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <CreditCardForm noCardAvailable={this.noCardAvailable} onCardSelect={this.onCardSelect} AppUserId={this.state.user.AppUserId} Token={this.state.user.Token}/>
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
        <TopGrid />
        <Grid>
          <Grid.Column mobile={16} tablet={12} computer={12}>
          {!this.state.user.loggedIn && guestEligible === 'true' &&  (
            <div>
              {this.guestGrid()}
              <Segment basic></Segment>
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
              {this.guestBillingInfo()}
            </div>
          )}
          {!this.state.user.loggedIn && guestEligible === 'false' &&  (
            <div>
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>Cart items not eligible for Guest Checkout. Please Login or Register to continue.</Message.Header>
              </Message.Content>
            </Message>
            <Grid>
              <Grid.Column mobile={16} tablet={4} computer={4}></Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment style={{}} basic>
                  <Button style={{width: "100%", height:"50px", background: "#12457b"}} as={Link} to='/login' primary>SIGN IN</Button>
                  <div style={{paddingTop: "10px", textAlign:"center", textDecoration: "underline"}}>
                    <a href="/signup">Sign Up</a>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                  </div>​
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}></Grid.Column>
            </Grid>
            </div>
          )}
          {this.state.user.loggedIn && (
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
              {this.userBillingGrid()}
            </div>
          )}
        </Grid.Column>
        <Grid.Column style={{paddingLeft: "0"}} mobile={16} tablet={4} computer={4}>
          <Header as='h2' style={{color: "#C0C0C0"}}>
            ORDER SUMMARY
          </Header>
          <Segment basic secondary>
          <div style={{padding: "10px"}}> 
          <Menu secondary>
            <Menu.Menu position="left">
              <Header color="grey" as="h4">SUBTOTAL</Header>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Header color="grey" as="h4">${this.state.subtotal.toFixed(2)}</Header>
            </Menu.Menu>
          </Menu>
          <Menu secondary>
            <Menu.Menu position="left">
            <Header color="grey"  as="h4">ESTIMATED TAX</Header>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Header color="grey" as="h4">${this.state.tax}</Header>
            </Menu.Menu>
          </Menu>
          <Menu secondary>
            <Menu.Menu position="left">
            <Header color="grey"  as="h4">TOTAL</Header>
            </Menu.Menu>
            <Menu.Menu position="right">
              <Header color="grey" as="h4">${(this.state.subtotal + this.state.tax).toFixed(2)}</Header>
            </Menu.Menu>
          </Menu>
          </div>
          </Segment>
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