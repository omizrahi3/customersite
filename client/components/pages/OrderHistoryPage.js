import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment } from "semantic-ui-react";
import TopGrid from '../grids/TopGrid';
import MyAccountBar from '../navigation/MyAccountBar';
import OrderHistoryFullGrid from '../grids/OrderHistoryFullGrid';

class OrderHistoryPage extends Component {
  state = {
  }

  componentDidMount() {
    console.log('SubscriptionsPage did mount');
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;
    return (
      <div>
        <TopGrid />
        <Grid>
          <Grid.Column mobile={16} tablet={3} computer={3}>
            <MyAccountBar path={pathname}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={13} computer={13}>
            <OrderHistoryFullGrid user={this.props.user} />
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

export default connect(mapStateToProps, { })(OrderHistoryPage);