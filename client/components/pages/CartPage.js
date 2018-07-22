import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Segment, Divider, Message, Header, Button, Icon, Menu, Input } from 'semantic-ui-react';
import TopGrid from '../grids/TopGrid';
import FeedGrid from '../grids/FeedGrid';
import VideoMessageGrid from '../grids/VideoMessageGrid';
import LiveChatGrid from '../grids/LiveChatGrid';
import { rfc } from '../../actions/cartActions';

const marginFix = {
  paddingTop: "10px"
};


class CartPage extends Component {
  state = {
    subtotal: 0,
    tax: 0,
    promocode: ''
  }

  onChange = (e, data) => {
    this.setState({promocode: data.value})
  }

  onSubmit = (e, data) => {
    console.log(this.state.promocode)
  }

  componentDidMount() {
    console.log('CartPage did mount');
    let subtotal = 0;
    this.props.cart.map(item => {
      console.log(item);
      subtotal += item.WebPrice;
    })
    console.log(subtotal);
    this.setState({subtotal})
  }

  handleRemoveClick = (e, data) => {
    console.log(data.value);
    let subtotal = 0;
    this.props.cart.map(item => {
      if (item.ProductOptionId !== data.value) {
        subtotal += item.WebPrice;
      }
    })
    this.setState({subtotal})
    this.props.rfc(data.value);
  }

  renderCartItems = cart => cart.map(item => {
    if (item.ProductDescription === "Feed") {
      return  (
        <div key={item.ProductOptionId}>
          <FeedGrid
            key={item.ProductOptionId}
            item={item}
            handleRemoveClick={this.handleRemoveClick}
          />
          <Divider style={marginFix} />
        </div>
      )
    } else if (item.ProductDescription === "Video Message") {
      return  (
        <div key={item.ProductOptionId}>
          <VideoMessageGrid
            key={item.ProductOptionId}
            item={item}
            handleRemoveClick={this.handleRemoveClick}
          />
          <Divider style={marginFix} />
        </div>
      )
    }
    else if (item.ProductDescription === "Live Chat") {
      return  (
        <div key={item.ProductOptionId}>
          <LiveChatGrid
            key={item.ProductOptionId}
            item={item}
            handleRemoveClick={this.handleRemoveClick}
          />
          <Divider style={marginFix} />
        </div>
      )
    }
  })

  render() {
    const { cart } = this.props;
    return (
      <div>
        <TopGrid />
        <Grid>
          <Grid.Column width={12}>
          {cart.length === 0  && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>Cart Is Empty. Please </Message.Header>
                <Link to="/talent">Go Back to Talent Search</Link>
              </Message.Content>
            </Message>
          )}
          {cart.length > 0 && (
            this.renderCartItems(cart)
          )}
          </Grid.Column>
          <Grid.Column style={{paddingLeft: "0"}} width={4}>
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
              {cart.length > 0 && (
                <Button style={{ background: "#b5cc18", height: "40px", width: "100%"}} as={Link} to='/billing'>CHECKOUT</Button>
              )}
              {this.props.cart.length === 0 && (
                <Button style={{ background: "#b5cc18", height: "40px", width: "100%"}} disabled as={Link} to='/billing'>CHECKOUT</Button>
              )}
            </Segment>
            <Header as='h2' style={{color: "#C0C0C0"}}>
              PROMO CODE
            </Header>
            <Segment basic secondary>
              <p style={{textAlign: "center", fontSize: "10px", color: "grey"}}>Note: All pricing on GetChatWith.com reflects a 30% discount compared to in-app pricing.</p>
              <Input
                style={{width: "60%"}}
                action={<Button style={{width: "50%"}} color="grey" onClick={this.onSubmit}>Apply</Button>}
                onChange={this.onChange}
              />
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

CartPage.propTypes = {
  rfc: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    cart: state.cart
  };
}

export default connect(mapStateToProps, { rfc })(CartPage);
