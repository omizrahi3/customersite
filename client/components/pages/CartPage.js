import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment, Card, Image, Header, Button, List } from 'semantic-ui-react';
import FeedGrid from '../grids/FeedGrid';
import VideoMessageGrid from '../grids/VideoMessageGrid';
import { rfc } from '../../actions/cartActions';

class CartPage extends Component {
  state = {
    subtotal: 0,
    tax: 0
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
    this.props.rfc(data.value);
  }

  renderCartItems = cart => cart.map(item => {
    console.log(item);
    
    if (item.ProductDescription === "Feed") {
      console.log('HELLO');
      return  (
        <FeedGrid
          key={item.ProductOptionId}
          item={item}
          handleRemoveClick={this.handleRemoveClick}
        />
      )
    } else if (item.ProductDescription === "Video Message") {
      return  (
        <VideoMessageGrid
          key={item.ProductOptionId}
          item={item}
          handleRemoveClick={this.handleRemoveClick}
        />
      )
    }
  })

  render() {
    const { cart } = this.props;
    return (
      <div>
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
            {cart.length > 0 && (
              <Grid divided='vertically'>
                {this.renderCartItems(cart)}
              </Grid>
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
              <Card.Content>
                <Button>CHECKOUT</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
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
