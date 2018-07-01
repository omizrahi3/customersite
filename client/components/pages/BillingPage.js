import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Segment, Card, Header, Button, Form, Breadcrumb, Message, Icon } from 'semantic-ui-react';
import FeedGrid from '../grids/FeedGrid';
import VideoMessage2Grid from '../grids/VideoMessage2Grid';
import NewCheckoutForm from '../forms/NewCheckoutForm';
import ExistingCheckoutForm from '../forms/ExistingCheckoutForm';
import CreditCardForm from '../forms/CreditCardForm';
import { checkoutExisting, checkoutNew, checkoutUpdate } from '../../actions/checkoutActions';
import { rfc } from '../../actions/cartActions';

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
    success: false
  }

  componentDidMount() {
    console.log('CartPage did mount');
    const { user } = this.props;

    if (Object.keys(user).length === 0 && user.constructor === Object) {
      user.loggedIn = false;
    } else {
      user.loggedIn = true;
    }
    let subtotal = 0;
    this.props.cart.map(item => {
      subtotal += item.WebPrice;
    })
    this.setState({subtotal, user});
  }

  noCardAvailable = () => this.setState({ noCard: true });

  checkboxSelection = (checked) => {
    this.setState({ updateCard: checked })
  }

  onCardSelect = card => this.setState({ card });

  submitNewGuest = (data) => {
    console.log('submitNewGuest');
    console.log(data);
  }

  submitNew = (data) => {
    console.log('submitNew');
    console.log(data);
    const checkoutData = {
      AppUserId: this.props.user.AppUserId,
      NameOnCard: `${data.firstName} ${data.lastName}`,
      Cvv: data.cvv,
      ExpirationDate: `${data.expMonth}/${data.expYear}`,
      CardNumber: data.cardNumber,
      Products: []
    };

    this.props.cart.map(item => {
      const product = {
        "ProductOptionId": item.ProductOptionId,
        "ProductName": item.ProductDescription,
        "SessionId":"",
        "Amount": item.WebPrice,
        "TalentId": item.TalentId,
        "DateMapperId": ""
      }
      checkoutData.Products.push(product);
    })
    const checkoutObject = {
      Token: this.props.user.Token,
      checkout: checkoutData
    }
    console.log('READY');
    return this.props.checkoutNew(checkoutObject).then(() => this.props.history.push('/dashboard'));
  }

  submitUpdate = (data) => {
    console.log('submitUpdate');
    console.log(data);
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
      const product = {
        "ProductOptionId": item.ProductOptionId,
        "ProductName": `${item.ProductDescription} plus 3`,
        "SessionId":"",
        "Amount": item.WebPrice,
        "TalentId": item.TalentId,
        "DateMapperId": ""
      }
      checkoutData.Products.push(product);
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

  handleRemoveClick = (e, data) => {
    console.log(data.value);
    this.props.rfc(data.value);
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
              <Button color='blue'>SIGN IN</Button>
              <Button color='blue'>SIGN UP</Button>
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
    const { loading, success } = this.state;
    return (
      <div>
        <Segment basic>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to="/dashboard">Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section as={Link} to="/cart">Cart</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Billing</Breadcrumb.Section>
          </Breadcrumb>
          <Header color="yellow">BILLING</Header>
        </Segment>
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
              <Link to="/dashboard">Go to your dashboard</Link>
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
            {!this.state.user.loggedIn && (
              <div>
                {this.guestGrid()}
                {this.guestBillingInfo()}
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
                    ${this.state.subtotal}
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
                    ${this.state.subtotal + this.state.tax}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

BillingPage.propTypes = {
  checkoutNew: PropTypes.func.isRequired,
  checkoutExisting: PropTypes.func.isRequired,
  rfc: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    cart: state.cart
  };
}

export default connect(mapStateToProps, { checkoutNew, checkoutExisting, rfc })(BillingPage);