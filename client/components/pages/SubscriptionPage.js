import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment, Image, Breadcrumb, Header, Modal, Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

class SubscriptionPage extends Component {
  state = {
    TalentFirstName: this.props.location.state.TalentFirstName,
    TalentLastName: this.props.location.state.TalentLastName,
    Description: this.props.location.state.Description,
    ProfilePictureReference: this.props.location.state.ProfilePictureReference
  }

  componentDidMount() {
    console.log('SubscriptionPage did mount')
    const { subscriptionid } = this.props.match.params;
    console.log(subscriptionid)
  }

  render() {
    const { TalentFirstName, TalentLastName, Description, ProfilePictureReference } = this.state;
    return (
      <div>
        <h1>{`${TalentFirstName} ${TalentLastName}`}</h1>
        <h2>{`${Description}`}</h2>
      </div>
    )
  }
}

SubscriptionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      subscriptionid: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(SubscriptionPage);
