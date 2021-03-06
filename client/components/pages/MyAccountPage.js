import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment } from "semantic-ui-react";
import TopGrid from '../grids/TopGrid';
import ProfileGrid from '../grids/ProfileGrid';
import PaymentGrid from '../grids/PaymentGrid';
import OrderHistoryGrid from '../grids/OrderHistoryGrid';
import DownloadTheAppGrid from '../grids/DownloadTheAppGrid';
import ActiveSubsGrid from '../grids/ActiveSubsGrid';
import MyAccountBar from '../navigation/MyAccountBar';

class MyAccountPage extends Component {
  state = {
  }

  componentDidMount() {
    // console.log('MyAccountPage did mount');
  }

  render() {
    const { user, location } = this.props;
    const { pathname } = location;
    return (
      <div>
        <TopGrid />
        <Grid>
          <Grid.Column mobile={16} tablet={3} computer={3}>
            <MyAccountBar path={pathname} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <ProfileGrid user={user}/>
            <Segment basic></Segment>
            <PaymentGrid user={user}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <OrderHistoryGrid user={user}/>
            <Segment basic></Segment>
            <DownloadTheAppGrid />
          </Grid.Column>
        </Grid>
        <Segment basic></Segment>
        <Grid>
          <Grid.Column mobile={1} tablet={2} computer={2}>
          </Grid.Column>
          <Grid.Column mobile={15} tablet={14} computer={14}>
            <ActiveSubsGrid user={user}/>
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