import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Segment, Card, Message, Header, Button, Breadcrumb, Icon } from 'semantic-ui-react';
import FeedGrid from '../grids/FeedGrid';
import VideoMessage2Grid from '../grids/VideoMessage2Grid';
import LiveChatGrid from '../grids/LiveChatGrid';
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
        <FeedGrid
          key={item.ProductOptionId}
          item={item}
          handleRemoveClick={this.handleRemoveClick}
        />
      )
    } else if (item.ProductDescription === "Video Message") {
      return  (
        <VideoMessage2Grid
          key={item.ProductOptionId}
          item={item}
          handleRemoveClick={this.handleRemoveClick}
        />
      )
    }
    else if (item.ProductDescription === "Live Chat") {
      return  (
        <LiveChatGrid
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
        {cart.length === 0  && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Cart Is Empty. Please </Message.Header>
              <Link to="/talent">Go Back to Talent Search</Link>
            </Message.Content>
          </Message>
        )}
        <Grid padded>
          <Grid.Column width={12} color="blue">{cart.length} Items</Grid.Column>
          <Grid.Column width={4} color="teal">
          Questions? support@getchatwith.com
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
              <Card.Content>
                {cart.length > 0 && (
                  <Button as={Link} to='/billing'>CHECKOUT</Button>
                )}
                {this.props.cart.length === 0 && (
                  <Button disabled as={Link} to='/billing'>CHECKOUT</Button>
                )}
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
