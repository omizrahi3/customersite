import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, List } from "semantic-ui-react";
import ProfileGrid from '../grids/ProfileGrid';
import PaymentGrid from '../grids/PaymentGrid';
import OrderHistoryGrid from '../grids/OrderHistoryGrid';
import DownloadTheAppGrid from '../grids/DownloadTheAppGrid';
import ActiveSubsGrid from '../grids/ActiveSubsGrid';

const linkStyle = {
  color: 'grey',
  textDecoration: 'underline',
  paddingBottom: '20px'
};

const highlightedlinkStyle = {
  color: 'gold',
  textDecoration: 'underline',
  paddingBottom: '20px'
};

const headerStyle = {
  background: '#42adf4'
};

const subHeaderStyle = {
  textDecoration: 'underline',
  color: 'white'
};

class MyAccountPage extends Component {
  state = {
  }

  componentDidMount() {
    console.log('MyAccountPage did mount');
  }

  render() {
    const { user, cart, logout, location } = this.props;
    const { pathname } = location;
    const { } = this.state;
    return (
      <div>
        <Grid padded>
          <Grid.Column width={10} color="blue"></Grid.Column>
          <Grid.Column width={6} style={headerStyle}>
            <Segment basic inverted style={headerStyle}>
            <Header textAlign="right">Have Questions?
              <Header.Subheader style={subHeaderStyle} as="a" href="https://getchatwith.com/">support@getchatwith.com</Header.Subheader>
            </Header>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={3}>
            <Segment basic secondary>
            <List>
              <List.Item style={pathname === '/myaccount' ? highlightedlinkStyle : linkStyle} as='a' href="/myaccount">My Account</List.Item>
              <List.Item style={pathname === '/profile' ? highlightedlinkStyle : linkStyle} as='a' href="/profile">Edit Profile</List.Item>
              <List.Item style={pathname === '/password' ? highlightedlinkStyle : linkStyle} as='a' href="/password">Reset Password</List.Item>
            </List>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <ProfileGrid user={this.props.user}/>
            <Segment basic></Segment>
            <PaymentGrid user={this.props.user}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <OrderHistoryGrid user={this.props.user}/>
            <Segment basic></Segment>
            <DownloadTheAppGrid />
          </Grid.Column>
        </Grid>
        <Segment basic></Segment>
        <Grid>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={14}>
            <ActiveSubsGrid user={this.props.user}/>
          </Grid.Column>
        </Grid>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { })(MyAccountPage);