import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Segment, Header } from "semantic-ui-react";

const headerStyle = {
  background: '#42adf4'
};

const subHeaderStyle = {
  textDecoration: 'underline',
  color: 'white'
};

const cartStyle = {
  textDecoration: 'underline',
  color: 'white'
};

class TopGrid extends Component {
  render() {
    const { cart } = this.props;
    return (
        <Grid padded>
          <Grid.Column style={{'paddingTop': "0px", 'paddingBottom': "0px"}} mobile={16} tablet={12} computer={12} color="blue">
          <div style={{padding: "20px"}}>
            <Header style={cartStyle} size="tiny" as={Link} to="/cart">({cart.length}) Items in Cart</Header>
          </div>
          </Grid.Column>
          <Grid.Column style={{'paddingTop': "0px", 'paddingBottom': "0px", 'background': '#42adf4'}} mobile={16} tablet={4} computer={4}>
            <Segment basic inverted style={headerStyle}>
            <Header size="tiny" textAlign="right">Have Questions?
              <Header.Subheader style={subHeaderStyle} as="a" href="mailto:support@chatwith.com">support@getchatwith.com</Header.Subheader>
            </Header>
            </Segment>
          </Grid.Column>
        </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps, { })(TopGrid);

