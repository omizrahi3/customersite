import React, { Component } from 'react'
import { Grid, Segment, Header } from "semantic-ui-react";

const headerStyle = {
  background: '#42adf4'
};

const subHeaderStyle = {
  textDecoration: 'underline',
  color: 'white'
};

class TopGrid extends Component {
  render() {
    return (
        <Grid padded>
          <Grid.Column style={{'paddingTop': "0px", 'paddingBottom': "0px"}} width={10} color="blue"></Grid.Column>
          <Grid.Column style={{'paddingTop': "0px", 'paddingBottom': "0px", 'background': '#42adf4'}} width={6}>
            <Segment basic inverted style={headerStyle}>
            <Header textAlign="right">Have Questions?
              <Header.Subheader style={subHeaderStyle} as="a" href="https://getchatwith.com/">support@getchatwith.com</Header.Subheader>
            </Header>
            </Segment>
          </Grid.Column>
        </Grid>
    )
  }
}

export default TopGrid
